import { Mod } from "./types"

type ApiEvents = "modChange"

export interface CMMMod extends Mod {
	disabled: boolean
}

class CMMApi {
	connected = false
	connectTimeoutId: number = 0
	_events: Record<ApiEvents, (() => void)[]> = { modChange: [] }
	mods: CMMMod[] = []
	constructor() {
		if (globalThis.window) {
			window.addEventListener("message", (ev: MessageEvent) => {
				if (typeof ev.data === "string" && ev.data.startsWith("cmm-ccrepo-"))
					this.processEvent(ev.data)
			})
			this.connectTimeoutId = setInterval(() => {
				if (!this.connected) window.postMessage("ccrepo-cmm-connect", "*")
				else clearInterval(this.connectTimeoutId)
			}, 100) as unknown as number // Dumb TS
		}
	}
	processEvent(data: string): void {
		this.connected = true
		if (data.startsWith("cmm-ccrepo-connect-")) {
			this.mods = JSON.parse(data.substr("cmm-ccrepo-connect-".length))
			this.emit("modChange")
		}
	}
	emit(eventName: ApiEvents): void {
		this._events[eventName].forEach(val => val())
	}
	on(eventName: ApiEvents, func: () => void): void {
		this._events[eventName].push(func)
	}
	off(eventName: ApiEvents, func: () => void): void {
		const index = this._events[eventName].indexOf(func)
		if (index === -1) return
		this._events[eventName].splice(index, 1)
	}
	submitMod(mod: Mod): void {
		window.postMessage(`ccrepo-cmm-submit-${JSON.stringify(mod)}`, "*")
	}
	unsubmitMod(keyname: string): void {
		window.postMessage(`ccrepo-cmm-unsubmit-${keyname}`, "*")
	}
}

export default CMMApi
