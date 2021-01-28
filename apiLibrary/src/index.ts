import CCRepoAPI from "./apiClass"
import mixinMods from "./apis/mods"
const FinalClass = mixinMods(CCRepoAPI)
export { FinalClass as CCRepoAPI }
export default FinalClass
export * from "./types"
export interface User {
	id: string
	tag: string
	admin: boolean
	system: boolean
}
