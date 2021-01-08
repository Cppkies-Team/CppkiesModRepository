import CCRepoAPI from "../apiClass"
import { Mod } from "../types"

export default function mixinMods<T extends new (...args: any[]) => CCRepoAPI>(
	ogClass: T
) {
	return class extendedClass extends ogClass {
		async getMods(): Promise<Mod[]> {
			return await (await this.callApi("GET", "mods/")).json() // I am too lazy to validate it, heh
		}
	}
}
