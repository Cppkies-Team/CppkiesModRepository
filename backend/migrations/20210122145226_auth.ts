import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("discord_auth", table => {
		table.boolean("admin").notNullable().defaultTo(false)
		table.boolean("system").notNullable().defaultTo(false)
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("discord_auth", table => {
		table.dropColumns("admin", "system")
	})
}
