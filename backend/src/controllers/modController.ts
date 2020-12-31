import boom from "@hapi/boom"
import db from "../db"
import { UnexpectedTypeError } from "../errors"
import ControllerEndpoint from "../controllerHelper"

export interface DBMod {
	id: string
	name: string
	description: string
	uploaded: number
	etc: Record<string, never>
}

const modDB = db.table<DBMod>("mods")

export const getMods = new ControllerEndpoint<{ Reply: DBMod[] }>(
	async () => {
		try {
			return await modDB.select()
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{ response: {} } // TODO: getMods schema
)

export const addMod = new ControllerEndpoint(async (req, res) => {
	if (typeof req.body !== "object" || req.body === null) {
		res.code(400)
		throw new UnexpectedTypeError(req.body, "object")
	}
	console.log(req.body)
	return req.body
})
