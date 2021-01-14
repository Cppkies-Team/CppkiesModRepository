import { prod } from "../prod.json"

export default class CCRepoAPI {
	apiLink: string = prod
		? "https://ccrepo.glander.club/api"
		: "http://localhost:9001/api"
	constructor(public apiKey: string) {}
	callApi(method: "GET" | "POST" | "DELETE", link: string) {
		return fetch(`${this.apiLink}/${link}`, {
			headers: { Authentication: this.apiKey },
			method,
		})
	}
}
