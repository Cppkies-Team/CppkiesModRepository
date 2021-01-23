import {
	AuthLoginBodySchema,
	AuthLoginBodySchemaInterface,
	DBAuth,
} from "../schemas/auth"
import ControllerEndpoint from "../controllerHelper"
import { oauth } from "../discord"
import boom from "@hapi/boom"
import db from "../db"
import {
	RefreshLoginBodySchema,
	RefreshLoginBodySchemaInterface,
} from "../schemas/auth"
import { toDatabaseTimestamp } from "../helpers"

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
			const discordReply = await oauth.tokenRequest({
				redirectUri: req.body.redirectUrl,
				code: req.body.code,
				grantType: "authorization_code",
				scope: "identify",
			})
			const user = await oauth.getUser(discordReply.access_token)
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
				})
			return {
				token: discordReply.access_token,
				refreshToken: discordReply.refresh_token,
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
			const discordReply = await oauth.tokenRequest({
				grantType: "refresh_token",
				scope: "identify",
				redirectUri: records[0].discord_redirect_uri,
				refreshToken: records[0].discord_refresh_token,
			})

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
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		body: RefreshLoginBodySchema,
	}
)
