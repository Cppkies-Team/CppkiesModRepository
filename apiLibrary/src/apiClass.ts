export default class CCRepoAPI {
	apiLink: string = "http://localhost:9001/api"
	constructor(private apiKey: string) {}
	protected callApi(method: "GET" | "POST" | "DELETE", link: string) {
		return fetch(`${this.apiLink}/${link}`, {
			headers: { Authentication: this.apiKey },
			method,
		})
	}
}
