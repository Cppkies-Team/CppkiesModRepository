import fastify, {
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from "fastify"
import dotenv from "dotenv"
dotenv.config()
import { RouteOptions } from "fastify"
import routeAll from "./routes"
import cors from "fastify-cors"

export interface TrueRouteOptions {
	routes: RouteOptions<
		RawServerDefault,
		RawRequestDefaultExpression<RawServerDefault>,
		RawReplyDefaultExpression<RawServerDefault>,
		any // Sorry, but typescript is a bit bruh
	>[]
}

const app = fastify({ logger: true })

app.register(cors)

app.get("/api/teapot", (_req, res) => {
	res.code(418)
	res.send("Haha, I'm a teapot!")
})

routeAll(app)

app.listen(9001)
