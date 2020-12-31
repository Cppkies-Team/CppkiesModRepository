import fastify, {
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from "fastify"
import dotenv from "dotenv"
dotenv.config()
import { RouteOptions } from "fastify"
import routeAll from "./routes"

export interface TrueRouteOptions {
	routes: RouteOptions<
		RawServerDefault,
		RawRequestDefaultExpression<RawServerDefault>,
		RawReplyDefaultExpression<RawServerDefault>,
		any // Sorry, but typescript is a bit bruh
	>[]
}

const app = fastify({ logger: true })

app.get("/api/teapot", (_req, res) => {
	_req.body
	res.code(418)
	res.send("Haha, I'm a teapot!")
})

routeAll(app)

app.listen(9001)
