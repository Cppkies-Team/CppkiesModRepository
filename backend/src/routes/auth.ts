import * as modController from "../controllers/authController"
import { completeControllerEndpoint } from "../controllerHelper"
import {
	getUserDetails,
	getThisUserDetails,
} from "../controllers/authController"

export const routes = [
	completeControllerEndpoint(modController.login, {
		method: "POST",
		url: "/api/login/",
	}),
	completeControllerEndpoint(modController.refreshLogin, {
		method: "POST",
		url: "/api/login/refresh/",
	}),
	completeControllerEndpoint(getUserDetails, {
		method: "POST",
		url: "/api/getUser/",
	}),
	completeControllerEndpoint(getThisUserDetails, {
		method: "POST",
		url: "/api/getUser/self",
	}),
]
