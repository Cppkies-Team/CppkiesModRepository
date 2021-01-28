import CCRepoAPI from "../apiClass"
import { Mod } from "../types"

export default function mixinMods<T extends new (...args: any[]) => CCRepoAPI>(
	ogClass: T
) {
	return class extendedClass extends ogClass {
		async getMods(): Promise<Mod[]> {
			return (await (await this.callApi("GET", "mods/")).json()).mods // I am too lazy to validate it, heh
		}
		async submitMod(link: string): Promise<void> {
			await this.callApi("POST", "mods/submit", { link })
		}
	}
}
