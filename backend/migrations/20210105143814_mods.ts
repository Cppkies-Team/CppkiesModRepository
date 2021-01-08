import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("mods", table => {
		table.json("icon").nullable()
		table.text("author_discord_id").notNullable().defaultTo("")
		table.text("version").notNullable().defaultTo("")
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("mods", table =>
		table.dropColumns("icon", "author_discord_id", "version")
	)
}
