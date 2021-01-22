import { exit } from "process"
import { bumpMod } from "./controllers/modController"
import db from "./db"
import { DBMod } from "./schemas/mods"
// Should be put on cron each day
;(async () => {
	const mods = await db.table<DBMod>("mods").select()
	for (const mod of mods)
		try {
			bumpMod(mod.package_link, null, mod.keyname)
		} catch (err) {
			console.warn(`Failed to bump mod: ${err}`)
		}
	exit(0)
})()
