import {
	AuthLoginQuerySchema,
	AuthLoginQuerySchemaInterface,
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
	if (!token) return false
	const records = await authDB().where({ discord_auth_token: token })
	// If token doesn't exist
	if (records.length === 0) return false
	// If token expired
	const expired =
		Date.now() > new Date(records[0].discord_token_expire_date).getTime()
	// If the token is expired, remove it (removed for now)
	// if (expired) await authDB().where({ discord_auth_token: token }).del()
	return !expired
}

export async function getUser(token: string): Promise<DBAuth | null> {
	return (await authDB().where({ discord_auth_token: token }))[0] ?? null
}

export const login = new ControllerEndpoint<{
	Querystring: AuthLoginQuerySchemaInterface
}>(
	async req => {
		const thisUrl = new URL(
			`${
				process.env.NODE_ENV === "production" ? "https" : "http" // Workaround due to fastify reporting wrong protocol
			}://${req.hostname}${req.url}`
		)
		const redirectUri = thisUrl.origin + thisUrl.pathname

		try {
			const discordReply = await oauth.tokenRequest({
				redirectUri,
				code: req.query.code,
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
					discord_redirect_uri: redirectUri,
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
	{ querystring: AuthLoginQuerySchema }
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
