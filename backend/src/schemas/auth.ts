export interface DBAuth {
	discord_id: string
	discord_auth_token: string
	discord_refresh_token: string
	discord_redirect_uri: string
	discord_token_expire_date: string
	admin: boolean
	system: boolean
}

export interface AuthLoginBodySchemaInterface {
	code: string
	redirectUrl: string
}

export const AuthLoginBodySchema = {
	type: "object",
	properties: {
		code: {
			type: "string",
		},
		redirectUrl: { type: "string" },
	},
	required: ["code", "redirectUrl"],
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
