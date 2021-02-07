import superagent from "superagent"

const apiEndpoint = "https://discord.com/api/v8"

export interface DiscordTokenReply {
	access_token: string
	token_type: "Bearer"
	expires_in: number // Usually 604800
	refresh_token: string
	scope: string
}

export interface DiscordUserReply {
	id: string
	username: string
	discriminator: string
	avatar: string
	flags: number
	premium_type: number
	public_flags: number
}

/**
 * Authenticates with discord to get the epic tokens
 * @param redirectUri The redirect uri of the service
 * @param code The code from the discord authentication page
 */
export async function fetchToken(
	redirectUri: string,
	code: string
): Promise<DiscordTokenReply> {
	const reply = await superagent
		.post(`${apiEndpoint}/oauth2/token`)
		.type("form")
		.set("Accept", "application/json")
		.send({
			grant_type: "authorization_code",
			scope: "identify",
			redirect_uri: redirectUri,
			client_id: process.env.DISCORD_APP_ID,
			client_secret: process.env.DISCORD_APP_SECRET,
			code,
		})
	return JSON.parse(reply.text)
}

/**
 * Asks discord to re-fetch the epic tokens
 * @param redirectUri The redirect uri of the service
 * @param refreshToken The refresh token to use in the request
 */
export async function refreshToken(
	redirectUri: string,
	refreshToken: string
): Promise<DiscordTokenReply> {
	const reply = await superagent
		.post(`${apiEndpoint}/oauth2/token`)
		.type("form")
		.set("Accept", "application/json")
		.send({
			grant_type: "refresh_token",
			scope: "identify",
			redirect_uri: redirectUri,
			client_id: process.env.DISCORD_APP_ID,
			client_secret: process.env.DISCORD_APP_SECRET,
			refresh_token: refreshToken,
		})
	return JSON.parse(reply.text)
}

export async function getUser(accessToken: string): Promise<DiscordUserReply> {
	const reply = await superagent.get(`${apiEndpoint}/users/@me`).set({
		Accept: "application/json",
		Authorization: `Bearer ${accessToken}`,
	})
	return JSON.parse(reply.text)
}
