import ControllerEndpoint from "../controllerHelper"
import { fetchToken, getUser as getDiscordUser, refreshToken } from "../discord"
import boom from "@hapi/boom"
import db from "../db"
import { toDatabaseTimestamp } from "../helpers"
import randomString from "crypto-random-string"

import {
	AuthenticationHeaderSchemaInterface,
	AuthenticationHeaderSchema,
	UserDetailsBodySchemaInterface,
	UserDetailsBodySchema,
	DBAuth,
} from "../schemas/auth"

const authDB = () => db<DBAuth>("auth")

/**
 * Generates a new unique cryptographically secure token
 */
export function generateToken(): string {
	return randomString({ length: 25, type: "base64" })
}

/**
 * Checks if a token is valid and not expired
 * @param token The token to validate
 */
export async function validateToken(token: string) {
	return !!getUser(token)
}

export async function getUser(token: string): Promise<DBAuth | null> {
	if (!token) return null
	const record = await authDB().where({ token }).first()
	if (!record) return null
	return record
}

export async function getUserById(id: number): Promise<DBAuth | null> {
	return (await authDB().where({ user_id: id }).first()) ?? null
}

export const getUserDetails = new ControllerEndpoint<{
	Body: UserDetailsBodySchemaInterface
}>(
	async (req, res) => {
		try {
			const user = await getUserById(req.body.userId)
			if (!user) {
				res.code(400)
				throw boom.badRequest("Bad Request")
			}

			return {
				id: user.user_id,
				username: user.username,
				admin: user.admin,
				system: user.system,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		body: UserDetailsBodySchema,
	}
)

export const getThisUserDetails = new ControllerEndpoint<{
	Headers: AuthenticationHeaderSchemaInterface
}>(
	async (req, res) => {
		try {
			const user = await getUser(req.headers.authentication)
			if (!user) {
				res.code(400)
				throw boom.badRequest("Invalid token")
			}

			return {
				id: user.user_id,
				username: user.username,
				admin: user.admin,
				system: user.system,
			}
		} catch (err) {
			throw boom.boomify(err)
		}
	},
	{
		headers: AuthenticationHeaderSchema,
	}
)
