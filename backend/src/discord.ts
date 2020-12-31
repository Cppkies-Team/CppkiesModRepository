import { hasOwnProperty } from "./helpers"
import superagent from "superagent"

const apiEndpoint = "https://discord.com/api/v6"

export interface DiscordReply {
	access_token: string
	token_type: "Bearer"
	expires_in: number // Usually 604800
	refresh_token: string
	scope: string
}
/**
 * Fetched the discord oauth2 api to get the tokens
 * @param redirectUri The redirect uri of the service
 * @param code The code from the discord authentication page
 */
export async function fetchToken(redirectUri: string, code: string) {
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
	const discordReply = JSON.parse(reply.text)
	if (!validateDiscordReply(discordReply))
		throw new Error("Invalid discord reply")
	return discordReply
}

export function validateDiscordReply(obj: unknown): obj is DiscordReply {
	if (typeof obj !== "object" || obj === null) return false
	if (
		!hasOwnProperty(obj, "access_token") ||
		typeof obj.access_token !== "string"
	)
		return false
	if (
		!hasOwnProperty(obj, "token_type") ||
		typeof obj.token_type !== "string"
	)
		return false
	if (
		!hasOwnProperty(obj, "expires_in") ||
		typeof obj.expires_in !== "number" ||
		isNaN(obj.expires_in)
	)
		return false
	if (
		!hasOwnProperty(obj, "refresh_token") ||
		typeof obj.refresh_token !== "string"
	)
		return false
	if (!hasOwnProperty(obj, "scope") || typeof obj.scope !== "string")
		return false
	return true
}
