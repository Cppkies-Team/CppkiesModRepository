import { prod } from "../prod.json"

type ApiEvents = "userChange"

export default class CCRepoAPI {
	_events = {} as Record<ApiEvents, (() => void)[] | undefined>
	apiLink = prod
		? "https://ccrepo.glander.club/api"
		: "http://localhost:9001/api"
	redirectUrl = prod
		? `${this.apiLink.substr(0, this.apiLink.length - 3)}login/`
		: "http://localhost:5500/login/"
	constructor(public apiKey?: string, public refreshToken?: string) {}
	async callApi(
		method: "GET" | "POST" | "DELETE",
		link: string,
		body?: object
	): Promise<Response> {
		const res = await fetch(`${this.apiLink}/${link}`, {
			headers: {
				Authentication: this.apiKey ?? "",
				"Content-Type": "application/json",
			},
			method,
			body: JSON.stringify(body),
		})

		if (!res.ok)
			if ((await res.json()).message === "Invalid token") {
				await this.updateToken()
				return await this.callApi(method, link, body)
			} else throw new Error(`${res.status}: ${res.statusText}`)
		return res
	}
	async createToken(code: string): Promise<void> {
		const res = await (
			await this.callApi("POST", "login/", {
				code,
				redirectUrl: this.redirectUrl,
			})
		).json()
		this.apiKey = res.token
		this.refreshToken = res.refreshToken
		this.emit("userChange")
	}
	async updateToken(): Promise<void> {
		const res = await (
			await this.callApi("GET", "login/refresh", {
				refreshToken: this.refreshToken,
			})
		).json()
		this.apiKey = res.token
		this.refreshToken = res.refreshToken
		this.emit("userChange")
	}
	emit(eventName: ApiEvents): void {
		if (!this._events[eventName]) this._events[eventName] = []
		else (this._events[eventName] as (() => void)[]).forEach(val => val())
	}
	on(eventName: ApiEvents, func: () => void): void {
		if (!this._events[eventName]) this._events[eventName] = [func]
		else (this._events[eventName] as (() => void)[]).push(func) // Trust me
	}
}
