import { badRequest, boomify } from "@hapi/boom"
import ControllerEndpoint from "../controllerHelper"
import db from "../db"
import { toDatabaseTimestamp } from "../helpers"
import { DBAuth } from "../schemas/auth"
import {
	AuthLoginBodySchema,
	AuthLoginBodySchemaInterface,
	DBGithubAuth,
} from "../schemas/appAuth"
import { generateToken, getUserById } from "./authController"
import { OAuthApp } from "@octokit/oauth-app"

const app = new OAuthApp({
	clientId: process.env.GITHUB_APP_ID ?? "",
	clientSecret: process.env.GITHUB_APP_SECRET ?? "",
})

const githubAuthDB = () => db.table<DBGithubAuth>("github_auth")
const authDB = () => db<DBAuth>("auth")

export const githubLogin = new ControllerEndpoint<{
	Body: AuthLoginBodySchemaInterface
}>(
	async req => {
		try {
			const githubReply = (await app.createToken(req.body)).authentication
			const githubUser = (
				await app.checkToken({
					token: githubReply.token,
				})
			).data.user
			if (!githubUser) throw badRequest()
			let user: DBAuth
			// If the user exists, update the tokens and stuff, otherwise, create the user
			if (
				await githubAuthDB()
					.where({
						github_id: githubUser.id,
					})
					.first()
			) {
				await githubAuthDB()
					.where({
						github_id: githubUser.id,
					})
					.update({
						github_auth_token: githubReply.token,
						github_redirect_uri: req.body.redirectUrl,
					})

				const userId = (
					await githubAuthDB()
						.where({
							github_id: githubUser.id,
						})
						.first()
				)?.user_id
				if (userId === undefined) throw new Error("Sanity check failed!")
				const maybeUser = await getUserById(userId)
				if (!maybeUser) throw new Error("Sanity check failed!")
				user = maybeUser
			} else {
				const newToken = generateToken()
				await authDB().insert({
					token: newToken,
					username: githubUser.login,
				})

				const newUserData = await authDB().where({ token: newToken }).first()
				if (!newUserData) throw new Error("Sanity check failed!")
				await githubAuthDB().insert({
					github_auth_token: githubReply.token,
					github_redirect_uri: req.body.redirectUrl,
					github_id: githubUser.id,
					user_id: newUserData.user_id,
				})
				user = newUserData
			}
			return user
		} catch (err) {
			throw boomify(err)
		}
	},
	{ body: AuthLoginBodySchema }
)
