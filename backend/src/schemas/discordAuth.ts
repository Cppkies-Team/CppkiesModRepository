export interface DBDiscordAuth {
	discord_id: string
	discord_auth_token: string
	discord_refresh_token: string
	discord_redirect_uri: string
	discord_token_expire_date: string
	user_id: number
}

export interface AuthDiscordLoginBodySchemaInterface {
	code: string
	redirectUrl: string
}

export const AuthDiscordLoginBodySchema = {
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

export interface RefreshDiscordLoginBodySchemaInterface {
	refreshToken: string
}

export const RefreshDiscordLoginBodySchema = {
	type: "object",
	properties: {
		refreshToken: {
			type: "string",
		},
	},
	required: ["refreshToken"],
	additionalProperties: false,
}
