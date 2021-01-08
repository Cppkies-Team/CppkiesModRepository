// Update with your config settings.
import dotenv from "dotenv"
dotenv.config()

export default {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite",
		},
		useNullAsDefault: true,
		migrations: {
			loadExtensions: [".ts", ".js"],
			extension: "ts",
		},
	},
	production: {
		client: "mysql2",
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DB,
		},
	},
} as const
