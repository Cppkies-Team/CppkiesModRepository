import { FastifyInstance } from "fastify"
import { TrueRouteOptions } from "../index"
import * as mods from "./mods"
import * as auth from "./auth"

const routes: TrueRouteOptions[] = [mods, auth]

async function routeAll(app: FastifyInstance): Promise<void> {
	for (const routeCollection of routes)
		routeCollection.routes.forEach(val => app.route(val))
}

export default routeAll
