import boom from "@hapi/boom"
import db from "../db"
import ControllerEndpoint from "../controllerHelper"
import {
	DBMod,
	Mod,
	ModSchema,
	DBModToMod,
	ModToDBMod,
	UploadModSchema,
	UploadMod,
} from "../schemas/mods"
import { toDatabaseTimestamp } from "../helpers"
import {
	AuthenticationHeaderSchema,
	AuthenticationHeaderSchemaInterface,
} from "../schemas/auth"
import { getUser, validateToken } from "./authController"
import { DBAuth } from "../schemas/auth"

const modDB = () => db.table<DBMod>("mods")

export const getMods = new ControllerEndpoint<{ Reply: { mods: Mod[] } }>(
	async () => {
		try {
			return {
				mods: (await modDB().select()).map(val => DBModToMod(val)),
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	}
)

export const addMod = new ControllerEndpoint<{
	Body: UploadMod
	Headers: AuthenticationHeaderSchemaInterface
}>(
	async (req, res) => {
		try {
			if (!(await validateToken(req.headers.authentication))) {
				res.code(400)
				throw boom.unauthorized("Invalid token")
			}
			const author = (await getUser(req.headers.authentication)) as DBAuth // Trust me
			let DBMod: DBMod = ModToDBMod({
				...req.body,
				uploaded: Date.now(),
				authorId: author.discord_id,
			})
			if ((await modDB().where("keyname", DBMod.keyname)).length !== 0) {
				res.code(400)
				throw boom.badRequest("Duplicate mod keyname")
			}
			await modDB().insert(DBMod)
		} catch (err) {
			if (err instanceof boom.Boom) throw err
			else throw boom.boomify(err)
		}
		res.code(200)
		res.send("")
	},
	{ body: UploadModSchema, headers: AuthenticationHeaderSchema }
)
