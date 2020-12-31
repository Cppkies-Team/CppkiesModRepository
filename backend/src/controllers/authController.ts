import {
	AuthLoginQuerySchema,
	AuthLoginQuerySchemaInterface,
} from "../schemas/auth"
import ControllerEndpoint from "../controllerHelper"
import { DiscordReply, fetchToken } from "../discord"
import boom from "@hapi/boom"

export const login = new ControllerEndpoint<{
	Querystring: AuthLoginQuerySchemaInterface
}>(
	async (req, res) => {
		const thisUrl = new URL(`${req.protocol}://${req.hostname}${req.url}`)
		const redirectUri = thisUrl.origin + thisUrl.pathname

		let discordReply: DiscordReply
		try {
			discordReply = await fetchToken(redirectUri, req.query.code)
		} catch (err) {
			throw boom.boomify(err)
		}
		//	discordReply.
		res.redirect("../..")
		return null
	},
	{ querystring: AuthLoginQuerySchema }
)
