import { completeControllerEndpoint } from "../controllerHelper"
import {
	getUserDetails,
	getThisUserDetails,
} from "../controllers/authController"

export const routes = [
	completeControllerEndpoint(getUserDetails, {
		method: "POST",
		url: "/api/getUser/",
	}),
	completeControllerEndpoint(getThisUserDetails, {
		method: "POST",
		url: "/api/getUser/self",
	}),
]
