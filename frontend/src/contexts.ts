import React, { useContext, useEffect, useState } from "react"
import CCRepoAPI from "../../apiLibrary/"
import { CoolReturnType, hasOwnProperty } from "./helpers"
import { prod } from "../prod.json"
import CMMApi, { CMMMod } from "./cmm-api"

//#region API context
interface LocalStorageData {
	token: string
}

export function writeTokens(api: CoolReturnType<typeof CCRepoAPI>): void {
	if (!api.token) localStorage.removeItem("tokens")
	else
		localStorage.setItem(
			"tokens",
			JSON.stringify({
				token: api.token,
			})
		)
}

let tokens: LocalStorageData | null = null
try {
	tokens = JSON.parse(localStorage.getItem("tokens") ?? "")
} catch {
	// eslint-disable-next-line no-empty
}

export const loginLinks = {
	discord: `https://discord.com/oauth2/authorize?client_id=794175481225150465&redirect_uri=${
		prod ? "https://ccrepo.glander.club" : "http://localhost:5500"
	}/login/discord&response_type=code&scope=identify`,
	github: `https://github.com/login/oauth/authorize?client_id=${
		prod ? "65316f25efec8b9bf2c4" : "8a25261deb974c3a769d"
	}&scope=read:user`,
}

export const defaultApi = new CCRepoAPI(tokens?.token)

defaultApi.on("tokenChange", () => writeTokens(defaultApi))

export const ApiContext = React.createContext(defaultApi)

//#endregion
//#region CMM Context

export const defaultCMMApi = new CMMApi()

export const CMMContext = React.createContext(defaultCMMApi)

export function useCMMMod(keyname: string): CMMMod | undefined {
	const cmm = useContext(CMMContext)
	const [, shouldChange] = useState(0)
	useEffect(() => {
		const func = () => shouldChange(Math.random())
		cmm.on("modChange", func)
		return () => cmm.off("modChange", func)
	}, [cmm])
	return cmm.mods.find(val => val.keyname === keyname)
}

//#endregion
