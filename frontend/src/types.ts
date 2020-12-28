export type CCIcon = [number, number, string?]

export interface Mod {
	name: string
	desc?: string
	icon?: CCIcon
	id: number
	version: string
}
