import { boomify } from "@hapi/boom"
import ControllerEndpoint from "../controllerHelper"
import db from "../db"
import { fetchToken, getUser } from "../discord"
import { toDatabaseTimestamp } from "../helpers"
import { DBAuth } from "../schemas/auth"
import {
	AuthDiscordLoginBodySchema,
	AuthDiscordLoginBodySchemaInterface,
	DBDiscordAuth,
} from "../schemas/discordAuth"
import { generateToken, getUserById } from "./authController"

const discordAuthDB = () => db.table<DBDiscordAuth>("discord_auth")
const authDB = () => db<DBAuth>("auth")

export const discordLogin = new ControllerEndpoint<{
	Body: AuthDiscordLoginBodySchemaInterface
}>(
	async req => {
		try {
			const discordReply = await fetchToken(
				req.body.redirectUrl,
				req.body.code
			)
			const discordUser = await getUser(discordReply.access_token)
			let user: DBAuth
			// If the user exists, update the tokens and stuff, otherwise, create the user
			if (
				await discordAuthDB()
					.where({
						discord_id: discordUser.id,
					})
					.first()
			) {
				await discordAuthDB()
					.where({
						discord_id: discordUser.id,
					})
					.update({
						discord_auth_token: discordReply.access_token,
						discord_refresh_token: discordReply.refresh_token,
						discord_redirect_uri: req.body.redirectUrl,
						discord_token_expire_date: toDatabaseTimestamp(
							new Date(
								Date.now() + discordReply.expires_in * 1000
							)
						),
					})

				const userId = (
					await discordAuthDB()
						.where({
							discord_id: discordUser.id,
						})
						.first()
				)?.user_id
				if (userId === undefined)
					throw new Error("Sanity check failed!")
				const maybeUser = await getUserById(userId)
				if (!maybeUser) throw new Error("Sanity check failed!")
				user = maybeUser
			} else {
				const newToken = generateToken()
				await authDB().insert({
					token: newToken,
					username: `${discordUser.username}#${discordUser.discriminator}`,
				})

				const newUserData = await authDB()
					.where({ token: newToken })
					.first()
				if (!newUserData) throw new Error("Sanity check failed!")
				await discordAuthDB().insert({
					discord_auth_token: discordReply.access_token,
					discord_refresh_token: discordReply.refresh_token,
					discord_redirect_uri: req.body.redirectUrl,
					discord_token_expire_date: toDatabaseTimestamp(
						new Date(Date.now() + discordReply.expires_in * 1000)
					),
					discord_id: discordUser.id,
					user_id: newUserData.user_id,
				})
				user = newUserData
			}
			return user
		} catch (err) {
			throw boomify(err)
		}
	},
	{ body: AuthDiscordLoginBodySchema }
)
