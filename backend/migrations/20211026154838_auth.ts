import * as Knex from "knex"

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable("github_auth", table => {
		table.integer("github_id", 10).primary().notNullable().unsigned()
		table.string("github_auth_token").unique().notNullable()
		table.string("github_redirect_uri").notNullable()
		table.integer("user_id", 10).unsigned().unique().notNullable()
		table.foreign("user_id").references("auth.user_id")
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropSchema("github_auth")
}
