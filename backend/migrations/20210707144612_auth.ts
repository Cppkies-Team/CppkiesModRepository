import * as Knex from "knex"
import { DBDiscordAuth } from "../src/schemas/discordAuth"
import { generateToken } from "../src/controllers/authController"
import { DBAuth } from "../src/schemas/auth"
import { DBMod } from "../src/schemas/mods"
import { getUser, refreshToken } from "../src/discord"

export async function up(knex: Knex): Promise<void> {
	//#region Migrate the discord_auth and auth tables
	await knex.schema.createTable("auth", table => {
		table.string("token").notNullable()
		table.increments("user_id").unsigned()
		table.boolean("admin").notNullable().defaultTo(false)
		table.boolean("system").notNullable().defaultTo(false)
		table.string("username")
	})
	await knex.schema.table("discord_auth", table => {
		table.integer("user_id", 10).unsigned()
		table.foreign("user_id").references("auth.user_id")
		table.dropColumns("admin", "system", "username")
	})

	for (const discordUser of await knex<DBDiscordAuth>("discord_auth")) {
		let username: string | undefined
		try {
			const discordReply = await refreshToken(
				discordUser.discord_redirect_uri,
				discordUser.discord_refresh_token
			)
			const discordUserInfo = await getUser(discordReply.access_token)
			username = `${discordUserInfo.username}#${discordUserInfo.discriminator}`
		} catch (err) {
			console.warn(
				`Don't know the username of user ${discordUser.discord_id}!`
			)
		}
		const newToken = generateToken()
		await knex<DBAuth>("auth").insert({
			admin: false,
			system: false,
			token: newToken,
			username,
		})
		const userId = (
			await knex<DBAuth>("auth").where({ token: newToken }).first()
		)?.user_id
		if (!userId) throw new Error("Sanity check failed!")
		if (!username) {
			await knex<DBAuth>("auth")
				.where({ user_id: userId })
				.update({ username: `Migrated discord user ${userId}` })
		}
		await knex<DBDiscordAuth>("discord_auth")
			.where({
				discord_refresh_token: discordUser.discord_refresh_token,
			})
			.update({ user_id: userId })
	}
	//#endregion
	// #region Migrate the mods table
	// knex.raw()
	await knex.schema.alterTable("mods", table => {
		table.integer("author_id", 10).unsigned()
		table.foreign("author_id").references("auth.id")
	})
	for (const mod of await knex<DBMod & { author_discord_id: string }>(
		"mods"
	)) {
		const modOwner = await knex<DBDiscordAuth>("discord_auth")
			.where({ discord_id: mod.author_discord_id })
			.first()
		if (!modOwner) throw new Error("This should never happen")
		await knex<DBMod>("mods")
			.where(mod)
			.update({ author_id: modOwner.user_id })
	}
	await knex.schema.alterTable("mods", table => {
		table.dropColumn("author_discord_id")
	})
	//#endregion
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable("discord_auth", table => {
		table.dropForeign(["user_id"]).dropColumn("user_id")
		table.boolean("admin").notNullable().defaultTo(false)
		table.boolean("system").notNullable().defaultTo(false)
		table.string("username")
	})
	await knex.schema.alterTable("mods", table => {
		table.dropForeign(["author_id"]).dropColumn("author_id")
		table.string("author_discord_id")
	})
	await knex.schema.dropTable("auth")
}
