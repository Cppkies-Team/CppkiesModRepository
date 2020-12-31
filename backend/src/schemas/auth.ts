export interface AuthLoginQuerySchemaInterface {
	code: string
}

export const AuthLoginQuerySchema = {
	type: "object",
	properties: {
		code: {
			type: "string",
		},
	},
	required: ["code"],
	additionalProperties: false,
}
