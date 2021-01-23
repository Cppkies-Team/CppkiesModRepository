import React from "react"
import CCRepoAPI from "../../apiLibrary/"
import { CoolReturnType, hasOwnProperty } from "./helpers"
import { prod } from "../prod.json"
interface LocalStorageData {
	token: string
	refreshToken: string
}

function validateLSTokens(obj: unknown): obj is LocalStorageData {
	if (typeof obj !== "object" || obj === null) return false
	if (!hasOwnProperty(obj, "token") || typeof obj.token !== "string")
		return false
	if (
		!hasOwnProperty(obj, "refreshToken") ||
		typeof obj.refreshToken !== "string"
	)
		return false
	return true
}

export function writeTokens(api: CoolReturnType<typeof CCRepoAPI>): void {
	localStorage.setItem(
		"tokens",
		JSON.stringify({ token: api.apiKey, refreshToken: api.refreshToken })
	)
}

let tokens: LocalStorageData | null = null
try {
	const lsData = JSON.parse(localStorage.getItem("tokens") ?? "")
	if (validateLSTokens(lsData)) tokens = lsData
} catch {
	// eslint-disable-next-line no-empty
}

export const loginLink = `https://discord.com/oauth2/authorize?client_id=794175481225150465&redirect_uri=${
	prod ? "https://ccrepo.glander.club" : "http://localhost:5500"
}/login/&response_type=code&scope=identify`

export const defaultApi = new CCRepoAPI(tokens?.token, tokens?.refreshToken)
export const ApiContext = React.createContext(defaultApi)
