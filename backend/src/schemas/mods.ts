import { toDatabaseTimestamp } from "../helpers"
import { JSONSchema6 } from "json-schema"

export type CCIcon = [number, number, string?]
export const CCIconSchema: JSONSchema6 = {
	type: "array",
	items: [{ type: "number" }, { type: "number" }, { type: "string" }],
	minItems: 2,
	maxItems: 3,
}
/**
 * The in-database representation of a mod
 */
export interface DBMod {
	keyname: string
	name: string
	description: string
	uploaded: string
	icon: string
	author_discord_id: string
	version: string
	etc: string
}

export interface UploadMod {
	/**
	 * The unique keyname of the mod, can consist of
	 * A-Z a-z 0-9 - _ . ! ~ * ' ( )
	 */
	keyname: string
	/**
	 * The shown name of the mod, doesn't contain any restrictions
	 */
	name: string
	/**
	 * A short description of the mod
	 */
	description: string
	/**
	 * The icon of the mod
	 */
	icon?: CCIcon
	/**
	 * The version of the mod, must be in semver
	 */
	version: string
}

export const UploadModSchema: JSONSchema6 = {
	type: "object",
	properties: {
		keyname: {
			type: "string",
		},
		name: {
			type: "string",
		},
		description: {
			type: "string",
		},
		icon: CCIconSchema,
		version: { type: "string" },
	},
	required: ["keyname", "name", "description", "version"],
	additionalProperties: false,
}

export interface Mod extends UploadMod {
	/**
	 * Timestamp of the mods creation
	 */
	uploaded: number
	/**
	 * Id of the mod's uploader
	 */
	authorId: string
}

export const ModSchema: JSONSchema6 = {
	...UploadModSchema,
	properties: {
		...UploadModSchema.properties,
		uploaded: { type: "number" },
		authorId: { type: "string" },
	},
	required: [...(UploadModSchema.required ?? []), "uploaded", "authorId"],
}

/**
 * Converts a database mod record to a mod instance
 */
export function DBModToMod(dbMod: DBMod): Mod {
	return {
		keyname: dbMod.keyname,
		name: dbMod.name,
		description: dbMod.description,
		uploaded: new Date(dbMod.uploaded).getTime(),
		icon: JSON.parse(dbMod.icon),
		version: dbMod.version,
		authorId: dbMod.author_discord_id,
	}
}

/**
 * Converts a mod instance to a database mod record
 */
export function ModToDBMod(mod: Mod): DBMod {
	return {
		keyname: mod.keyname,
		name: mod.name,
		description: mod.description,
		uploaded: toDatabaseTimestamp(new Date(mod.uploaded ?? Date.now())),
		author_discord_id: mod.authorId,
		icon: JSON.stringify(mod.icon),
		version: mod.version,
		etc: "{}",
	}
}

export interface QueryModSchemaInterface {
	keyname?: string
	name?: string
}

export const QueryModSchema: JSONSchema6 = {
	type: "object",
	properties: {
		keyname: {
			type: "string",
		},
		name: {
			type: "string",
		},
	},
	additionalProperties: false,
}
