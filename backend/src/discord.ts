import DiscordOAuth2 from "discord-oauth2"
export const oauth = new DiscordOAuth2({
	clientId: process.env.DISCORD_APP_ID,
	clientSecret: process.env.DISCORD_APP_SECRET,
})
