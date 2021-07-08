import knex from "knex"
import config from "./knexfile"
import path from "path"

const finalConfig =
	config[process.env.NODE_ENV !== "production" ? "development" : "production"]
if (finalConfig.client === "sqlite3")
	// @ts-expect-error This is wrong
	finalConfig.connection.filename = path.join(
		__dirname,
		"..", // @ts-expect-error This is wrong
		finalConfig.connection.filename
	)
const db = knex(finalConfig)
export default db
