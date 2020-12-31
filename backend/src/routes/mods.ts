import { RouteOptions } from "fastify"
import * as modController from "../controllers/modController"
import { completeControllerEndpoint } from "../controllerHelper"

export const routes = [
	completeControllerEndpoint(modController.getMods, {
		method: "GET",
		url: "/api/mods/",
	}),
	//{ method: "POST", url: "/api/mods/submit", handler: modController.addMod },
]
