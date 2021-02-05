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
	package_link: string
	entrypoint: string
	etc: string
}

/**
 * The package.json which will be uploaded to ccrepo
 */
export type UploadMod = {
	name: string
	main: string
	description: string
	version: string
	author?: string
	ccrepo?: {
		icon?: CCIcon
		entrypoint?: string
		name?: string
	}
	// Y'know, the other properties, like json schema's additionalProperties
	[name: string]: unknown
}

export const UploadModSchema: JSONSchema6 = {
	type: "object",
	properties: {
		name: {
			type: "string",
		},
		version: { type: "string" },
		description: {
			type: "string",
		},
		main: { type: "string" },
		ccrepo: {
			type: "object",
			properties: {
				icon: CCIconSchema,
				entrypoint: { type: "string" },
				name: { type: "string" },
			},
			additionalProperties: false,
		},
	},
	required: ["name", "description", "version", "main"],
	additionalProperties: true,
}

export interface Mod {
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
	/**
	 * Timestamp of the mods creation
	 */
	uploaded: number
	/**
	 * Id of the mod's uploader
	 */
	authorId: string
	/**
	 * The link to the code of the mod
	 */
	entrypoint: string
	/**
	 * Link to the package's package.json
	 */
	packageLink: string
}

export const ModSchema: JSONSchema6 = {
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
		uploaded: { type: "number" },
		authorId: { type: "string" },
		entrypoint: { type: "string" },
	},
	required: [
		"keyname",
		"name",
		"description",
		"version",
		"uploaded",
		"authorId",
		"entrypoint",
	],
	additionalProperties: false,
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
		entrypoint: dbMod.entrypoint,
		packageLink: dbMod.package_link,
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

export interface UploadModControllerSchemaInterface {
	link: string
}

export const UploadModControllerSchema: JSONSchema6 = {
	type: "object",
	properties: { link: { type: "string" } },
	required: ["link"],
}
