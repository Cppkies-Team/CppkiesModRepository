import * as modController from "../controllers/authController"
import { completeControllerEndpoint } from "../controllerHelper"

export const routes = [
	completeControllerEndpoint(modController.login, {
		method: "GET",
		url: "/api/login/",
	}),
	completeControllerEndpoint(modController.refreshLogin, {
		method: "POST",
		url: "/api/login/refresh/",
	}),
]
