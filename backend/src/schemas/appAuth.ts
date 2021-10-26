export interface DBDiscordAuth {
	discord_id: string
	discord_auth_token: string
	discord_refresh_token: string
	discord_redirect_uri: string
	discord_token_expire_date: string
	user_id: number
}

export interface DBGithubAuth {
	github_id: number
	github_auth_token: string
	github_redirect_uri: string
	user_id: number
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
