import knex from "knex"
import config from "./knexfile"
import path from "path"
const finalConfig = config[process.env.NODE_ENV ?? "development"]
if (finalConfig?.connection?.filename)
	finalConfig.connection.filename = path.join(
		__dirname,
		"..",
		finalConfig.connection.filename
	)
const db = knex(finalConfig)
export default db
