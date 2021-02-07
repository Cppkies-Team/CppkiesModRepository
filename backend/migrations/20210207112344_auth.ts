import * as Knex from "knex"
import { DBAuth } from "../src/schemas/auth"
import { getUser, refreshToken } from "../src/discord"
import { toDatabaseTimestamp } from "../src/helpers"

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table("discord_auth", table => {
		table.string("username")
	})

	for (const user of await knex<DBAuth>("discord_auth")) {
		try {
			const discordReply = await refreshToken(
				user.discord_redirect_uri,
				user.discord_refresh_token
			)
			const discordUser = await getUser(discordReply.access_token)
			await knex<DBAuth>("discord_auth")
				.where({
					discord_refresh_token: user.discord_refresh_token,
				})
				.update({
					discord_auth_token: discordReply.access_token,
					discord_refresh_token: discordReply.refresh_token,
					discord_token_expire_date: toDatabaseTimestamp(
						new Date(Date.now() + discordReply.expires_in * 1000)
					),
					username: discordUser.username,
				})
			console.log(`Set the username for ${discordUser.username}`)
		} catch (err) {
			console.warn("Couldn't set username")
			console.warn(err)
		}
	}
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("discord_auth", table =>
		table.dropColumn("username")
	)
}
