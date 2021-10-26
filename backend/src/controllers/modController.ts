import boom from "@hapi/boom"
import db from "../db"
import ControllerEndpoint from "../controllerHelper"
import {
	DBMod,
	Mod,
	DBModToMod,
	UploadModSchema,
	UploadMod,
} from "../schemas/mods"
import {
	AuthenticationHeaderSchema,
	AuthenticationHeaderSchemaInterface,
	DBAuth,
} from "../schemas/auth"
import { getUser, getUserById } from "./authController"
import { toDatabaseTimestamp } from "../helpers"
import sa from "superagent"
import ajv from "ajv"
import {
	UploadModControllerSchemaInterface,
	UploadModControllerSchema,
} from "../schemas/mods"

const modDB = () => db.table<DBMod>("mods")
const trustMe = <T>(thing: unknown): thing is T => true

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

const validator = ajv()

export async function bumpMod(
	link: string,
	token: string | null,
	keyname?: string
): Promise<void> {
	// Get the bumper
	const bumper = token === null ? null : await getUser(token)
	if (!bumper && token !== null) throw boom.unauthorized("Invalid token")

	let res: any // Typescript never recasts it if it's `unknown`, *why*
	try {
		res = JSON.parse((await sa(link)).text)
	} catch {
		throw boom.badRequest("Could not fetch mod from server")
	}
	if (!trustMe<UploadMod>(res) || !validator.validate(UploadModSchema, res))
		throw boom.badData(
			`Invalid server response: ${validator.errorsText(validator.errors)}`
		)

	if (
		(keyname && res.name !== keyname) ||
		(!keyname && (await modDB().where({ keyname: res.name }).first()))
	)
		if (keyname)
			throw boom.badRequest(
				"Invalid keyname, keyname must never change, you must delete the mod with the current keyname and create a mod with the new one."
			)
		else throw boom.badRequest("Mod with keyname already exists")

	let author: DBAuth
	// Check if mod exists
	const oldMod: DBMod | undefined = await modDB()
		.where({ keyname: res.name })
		.first()
	if (!oldMod) {
		if (!bumper) throw boom.internal() // System submitted a mod
		author = bumper
	} else {
		const ogAuthor = await getUserById(oldMod.author_id)
		if (!ogAuthor) throw boom.internal("Mod author doesn't exist!")
		if (bumper && ogAuthor.user_id !== bumper.user_id)
			throw boom.unauthorized("Only the owner can publish new mod versions!")
		author = ogAuthor
	}

	const dbMod: DBMod = {
		keyname: res.name,
		name: res.ccrepo?.name ?? res.name,
		version: res.version,
		description: res.description,
		entrypoint: res.ccrepo?.entrypoint ?? res.main,
		uploaded: oldMod ? oldMod.uploaded : toDatabaseTimestamp(new Date()),
		author_id: author.user_id,
		icon: JSON.stringify(res.ccrepo?.icon || null),
		package_link: link,
		etc: "{}",
	}

	try {
		await db.transaction(async ctx => {
			try {
				await modDB().transacting(ctx).where({ keyname: res.name }).del()
				await modDB().transacting(ctx).insert(dbMod)
				await ctx.commit()
			} catch (err) {
				await ctx.rollback()
				throw err
			}
		})
	} catch (err) {
		throw boom.internal("Internal database issue")
	}
}

export const addMod = new ControllerEndpoint<{
	Body: UploadModControllerSchemaInterface
	Headers: AuthenticationHeaderSchemaInterface
}>(
	async (req, res) => {
		try {
			await bumpMod(req.body.link, req.headers.authentication)
		} catch (err) {
			if (err instanceof boom.Boom) {
				if (!err.isServer) res.code(400)
				throw err
			} else throw boom.boomify(err)
		}
		res.code(200)
		res.send("")
	},
	{
		body: UploadModControllerSchema,
		headers: AuthenticationHeaderSchema,
	}
)
