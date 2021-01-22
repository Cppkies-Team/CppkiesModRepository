import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.table("mods", table => {
		table.text("package_link").notNullable().defaultTo("")
		table.text("entrypoint").notNullable().defaultTo("")
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.table("mods", table => {
		table.dropColumns("package_link", "entrypoint")
	})
}
