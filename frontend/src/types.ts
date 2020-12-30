export type CCIcon = [number, number, string?]

export interface Mod {
	name: string
	desc?: string
	icon?: CCIcon
	version: string
}
