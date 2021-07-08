export interface DBAuth {
	token: string
	user_id: number
	admin: boolean
	system: boolean
	username: string
}

export interface UserDetailsBodySchemaInterface {
	userId: number
}

export const UserDetailsBodySchema = {
	type: "object",
	properties: {
		userId: {
			type: "number",
		},
	},
	required: ["userId"],
	additionalProperties: false,
}

export interface AuthenticationHeaderSchemaInterface {
	authentication: string
}

export const AuthenticationHeaderSchema = {
	type: "object",
	properties: {
		authentication: { type: "string" },
	},
	required: ["authentication"],
}
