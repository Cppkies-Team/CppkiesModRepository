import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("discord_auth", table => {
		table.text("discord_id").notNullable()
		table.string("discord_auth_token", 511).unique().notNullable()
		table.string("discord_refresh_token", 511).unique().notNullable()
		table.text("discord_redirect_uri").notNullable()
		table.timestamp("discord_token_expire_date").notNullable()
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("discord_auth")
}
