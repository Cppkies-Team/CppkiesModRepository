import {
	AuthLoginBodySchema,
	AuthLoginBodySchemaInterface,
	DBAuth,
} from "../schemas/auth"
import ControllerEndpoint from "../controllerHelper"
import { fetchToken, getUser as getDiscordUser, refreshToken } from "../discord"
import boom from "@hapi/boom"
import db from "../db"
import {
	RefreshLoginBodySchema,
	RefreshLoginBodySchemaInterface,
} from "../schemas/auth"
import { toDatabaseTimestamp } from "../helpers"
import {
	AuthenticationHeaderSchemaInterface,
	AuthenticationHeaderSchema,
} from "../schemas/auth"
import {
	UserDetailsBodySchemaInterface,
	UserDetailsBodySchema,
} from "../schemas/auth"

const authDB = () => db.table<DBAuth>("discord_auth")

/**
 * Checks if a token is valid and not expired
 * @param token The token to validate
 */
export async function validateToken(token: string) {
	return !!getUser(token)
}

export async function getUser(token: string): Promise<DBAuth | null> {
	if (!token) return null
	const records = await authDB().where({ discord_auth_token: token })
	// If token doesn't exist
	if (records.length === 0) return null
	// If token expired
	const expired =
		Date.now() > new Date(records[0].discord_token_expire_date).getTime()
	// If the token is expired, remove it (removed for now)
	// if (expired) await authDB().where({ discord_auth_token: token }).del()
	return expired ? null : records[0]
}

export async function getUserById(id: string): Promise<DBAuth | null> {
	return (await authDB().select().where({ discord_id: id }))[0]
}

export const login = new ControllerEndpoint<{
	Body: AuthLoginBodySchemaInterface
}>(
	async req => {
		try {
			const discordReply = await fetchToken(
				req.body.redirectUrl,
				req.body.code
			)
			const user = await getDiscordUser(discordReply.access_token)
			// Don't add to db if identical token exists
			if (
				(
					await authDB().where({
						discord_auth_token: discordReply.access_token,
					})
				).length === 0
			)
				await authDB().insert({
					discord_auth_token: discordReply.access_token,
					discord_refresh_token: discordReply.refresh_token,
					discord_id: user.id,
					discord_redirect_uri: req.body.redirectUrl,
					discord_token_expire_date: toDatabaseTimestamp(
						new Date(Date.now() + discordReply.expires_in * 1000)
					),
					username: user.username,
				})
			return {
				token: discordReply.access_token,
				refreshToken: discordReply.refresh_token,
				expiresIn: discordReply.expires_in * 1000,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{ body: AuthLoginBodySchema }
)

export const refreshLogin = new ControllerEndpoint<{
	Body: RefreshLoginBodySchemaInterface
}>(
	async (req, res) => {
		try {
			const records = await authDB().where({
				discord_refresh_token: req.body.refreshToken,
			})
			if (records.length === 0) {
				res.code(400)
				throw boom.badRequest("Bad Request")
			}
			const discordReply = await refreshToken(
				records[0].discord_redirect_uri,
				records[0].discord_refresh_token
			)

			await authDB()
				.where({
					discord_refresh_token: req.body.refreshToken,
				})
				.update({
					discord_auth_token: discordReply.access_token,
					discord_refresh_token: discordReply.refresh_token,
					discord_token_expire_date: toDatabaseTimestamp(
						new Date(Date.now() + discordReply.expires_in * 1000)
					),
				})
			return {
				token: discordReply.access_token,
				refreshToken: discordReply.refresh_token,
				expiresIn: discordReply.expires_in * 1000,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		body: RefreshLoginBodySchema,
	}
)

export const getUserDetails = new ControllerEndpoint<{
	Body: UserDetailsBodySchemaInterface
}>(
	async (req, res) => {
		try {
			const user = await getUserById(req.body.userId.toString())
			if (!user) {
				res.code(400)
				throw boom.badRequest("Bad Request")
			}

			return {
				id: user.discord_id,
				tag: user.username ?? "???",
				admin: user.admin,
				system: user.system,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		body: UserDetailsBodySchema,
	}
)

export const getThisUserDetails = new ControllerEndpoint<{
	Headers: AuthenticationHeaderSchemaInterface
}>(
	async (req, res) => {
		try {
			const user = await getUser(req.headers.authentication)
			if (!user) {
				res.code(400)
				throw boom.badRequest("Invalid token")
			}

			return {
				id: user.discord_id,
				tag: user.username ?? "???",
				admin: user.admin,
				system: user.system,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		headers: AuthenticationHeaderSchema,
	}
)
