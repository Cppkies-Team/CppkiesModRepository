import { completeControllerEndpoint } from "../controllerHelper"
import {
	getUserDetails,
	getThisUserDetails,
} from "../controllers/authController"
import { discordLogin } from "../controllers/discordAuthController"
import { githubLogin } from "../controllers/githubAuthController"

export const routes = [
	completeControllerEndpoint(getUserDetails, {
		method: "POST",
		url: "/api/getUser/",
	}),
	completeControllerEndpoint(getThisUserDetails, {
		method: "POST",
		url: "/api/getUser/self",
	}),
	completeControllerEndpoint(discordLogin, {
		method: "POST",
		url: "/api/login/discord",
	}),
	completeControllerEndpoint(githubLogin, {
		method: "POST",
		url: "/api/login/github",
	}),
]
