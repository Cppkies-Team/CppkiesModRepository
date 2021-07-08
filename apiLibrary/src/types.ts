export type CCIcon = [number, number, string?]

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

export interface User {
	id: number
	username: string
	admin: boolean
	system: boolean
}
