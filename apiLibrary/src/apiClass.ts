import { prod } from "../prod.json"
import { User } from "./types"

type ApiEvents = "userChange" | "tokenChange"
type LoginPlatform = "discord" | "github"

export default class CCRepoAPI {
	_events: Partial<Record<ApiEvents, (() => void)[]>> = {}
	user?: User
	apiLink = prod
		? "https://ccrepo.glander.club/api"
		: "http://localhost:9001/api"
	redirectUrl = prod
		? `${this.apiLink.substr(0, this.apiLink.length - 3)}login/`
		: "http://localhost:5500/login/"
	constructor(public token?: string) {
		if (token) this.getSelfUser()
	}
	async callApi(
		method: "GET" | "POST" | "DELETE",
		link: string,
		body?: object
	): Promise<Response> {
		const res = await fetch(
			link.startsWith("http://") ? link : `${this.apiLink}/${link}`,
			{
				headers: {
					Authentication: this.token ?? "",
					...(body ? { "Content-Type": "application/json" } : {}),
				},
				method,
				body: JSON.stringify(body),
			}
		)

		if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`)
		return res
	}
	async createToken(code: string, platform: LoginPlatform): Promise<void> {
		const res = await (
			await this.callApi("POST", `login/${platform}`, {
				code,
				redirectUrl: this.redirectUrl + platform,
			})
		).json()
		this.token = res.token
		this.emit("tokenChange")
		await this.getSelfUser()
	}
	async getUser(id: number): Promise<User> {
		return await (await this.callApi("POST", "getUser/", { id })).json()
	}
	async getSelfUser(): Promise<User> {
		const ret = await (await this.callApi("POST", "getUser/self")).json()
		this.user = ret
		this.emit("userChange")
		return ret
	}
	emit(eventName: ApiEvents): void {
		if (!this._events[eventName]) this._events[eventName] = []
		else (this._events[eventName] as (() => void)[]).forEach(val => val())
	}
	on(eventName: ApiEvents, func: () => void): void {
		if (!this._events[eventName]) this._events[eventName] = [func]
		else (this._events[eventName] as (() => void)[]).push(func) // Trust me
	}
	off(eventName: ApiEvents, func: () => void): void {
		if (this._events[eventName]?.includes(func))
			this._events[eventName]?.splice(
				this._events[eventName]?.indexOf(func) ?? 0,
				1
			)
	}
}
