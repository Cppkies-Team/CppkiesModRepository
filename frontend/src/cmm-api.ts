import { Mod } from "./types"

type ApiEvents = "modChange"

export interface CMMMod extends Mod {
	disabled: boolean
}

class CMMApi {
	connected = false
	connectTimeoutId: number
	_events: Partial<Record<ApiEvents, (() => void)[]>> = {}
	mods: CMMMod[] = []
	constructor() {
		window.addEventListener("message", (ev: MessageEvent) => {
			if (typeof ev.data === "string" && ev.data.startsWith("cmm-ccrepo-"))
				this.processEvent(ev.data)
		})
		this.connectTimeoutId = setInterval(() => {
			if (!this.connected) window.postMessage("ccrepo-cmm-connect", "*")
			else clearInterval(this.connectTimeoutId)
		}, 100) as unknown as number // Dumb TS
	}
	processEvent(data: string): void {
		this.connected = true
		if (data.startsWith("cmm-ccrepo-connect-")) {
			this.mods = JSON.parse(data.substr("cmm-ccrepo-connect-".length))
			this.emit("modChange")
		}
	}
	emit(eventName: ApiEvents): void {
		if (!this._events[eventName]) this._events[eventName] = []
		else (this._events[eventName] as (() => void)[]).forEach(val => val())
	}
	on(eventName: ApiEvents, func: () => void): void {
		if (!this._events[eventName]) this._events[eventName] = [func]
		else (this._events[eventName] as (() => void)[]).push(func) // Trust me
	}
	submitMod(mod: Mod): void {
		window.postMessage(`ccrepo-cmm-submit-${JSON.stringify(mod)}`, "*")
	}
	unsubmitMod(keyname: string): void {
		window.postMessage(`ccrepo-cmm-unsubmit-${keyname}`, "*")
	}
}

export default CMMApi
