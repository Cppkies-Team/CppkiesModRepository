import React from "react"
import CCRepoAPI from "../../apiLibrary/"
import { CoolReturnType, hasOwnProperty } from "./helpers"
import { prod } from "../prod.json"
import CMMApi from "./cmm-api"

//#region API context
interface LocalStorageData {
	token: string
	refreshToken: string
	tokenExpiryDate?: number
}

export function writeTokens(api: CoolReturnType<typeof CCRepoAPI>): void {
	localStorage.setItem(
		"tokens",
		JSON.stringify({
			token: api.apiKey,
			refreshToken: api.refreshToken,
			tokenExpiryDate: Date.now() + api.tokenExpiresIn,
		})
	)
}

let tokens: LocalStorageData | null = null
try {
	tokens = JSON.parse(localStorage.getItem("tokens") ?? "")
} catch {
	// eslint-disable-next-line no-empty
}

export const loginLink = `https://discord.com/oauth2/authorize?client_id=794175481225150465&redirect_uri=${
	prod ? "https://ccrepo.glander.club" : "http://localhost:5500"
}/login/&response_type=code&scope=identify`

export const defaultApi = new CCRepoAPI(tokens?.token, tokens?.refreshToken)

if (
	defaultApi.refreshToken &&
	tokens?.tokenExpiryDate &&
	tokens.tokenExpiryDate - Date.now() < 1000 * 60 * 60 * 24 // If expiry date is < day
)
	defaultApi.updateToken().catch(() => console.warn("Couldn't refresh tokens."))

defaultApi.on("tokenChange", () => writeTokens(defaultApi))

export const ApiContext = React.createContext(defaultApi)

//#endregion
//#region CMM Context

export const defaultCMMApi = new CMMApi()

export const CMMContext = React.createContext(defaultCMMApi)

//#endregion
