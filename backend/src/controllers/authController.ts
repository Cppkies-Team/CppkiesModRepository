import {
	AuthLoginQuerySchema,
	AuthLoginQuerySchemaInterface,
} from "../schemas/auth"
import ControllerEndpoint from "../controllerHelper"
import { DiscordReply, fetchToken } from "../discord"
import boom from "@hapi/boom"

// TODO: This shouldn't be a redirecting page, this is the *api* page, so, TODO: make the frontend redirect page

export const login = new ControllerEndpoint<{
	Querystring: AuthLoginQuerySchemaInterface
}>(
	async (req, res) => {
		const thisUrl = new URL(
			`${
				process.env.NODE_ENV === "production" ? "https" : "http" // Workaround due to fastify reporting wrong protocol
			}://${req.hostname}${req.url}`
		)
		const redirectUri = thisUrl.origin + thisUrl.pathname

		let discordReply: DiscordReply
		try {
			discordReply = await fetchToken(redirectUri, req.query.code)
		} catch (err) {
			throw boom.boomify(err)
		}
		// TODO: Store and use the token
		// discordReply.access_token
		res.redirect("../..")
		return null
	},
	{ querystring: AuthLoginQuerySchema }
)
