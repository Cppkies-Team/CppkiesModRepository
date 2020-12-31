import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("mods", table => {
		// A keyname can consist of A-Z a-z 0-9 - _ . ! ~ * ' ( )
		table.string("keyname", 511).unique().primary().notNullable()
		table.text("name").notNullable()
		table.text("description").notNullable()
		table.timestamp("uploaded").notNullable()
		table.json("etc").notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("mods")
}
