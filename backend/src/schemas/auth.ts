export interface DBAuth {
	discord_id: string
	discord_auth_token: string
	discord_refresh_token: string
	discord_redirect_uri: string
	discord_token_expire_date: string
}

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

export interface RefreshLoginBodySchemaInterface {
	refreshToken: string
}

export const RefreshLoginBodySchema = {
	type: "object",
	properties: {
		refreshToken: {
			type: "string",
		},
	},
	required: ["refreshToken"],
	additionalProperties: false,
}

export interface AuthenticationHeaderSchemaInterface {
	authentication: string
}

export const AuthenticationHeaderSchema = {
	authentication: { type: "string" },
}
