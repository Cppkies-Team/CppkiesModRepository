import { completeControllerEndpoint } from "../controllerHelper"
import { discordLogin } from "../controllers/discordAuthController"

export const routes = [
	completeControllerEndpoint(discordLogin, {
		method: "POST",
		url: "/api/login/discord",
	}),
]
