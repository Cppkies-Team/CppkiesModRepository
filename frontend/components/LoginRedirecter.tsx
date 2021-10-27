import React, { useContext, useEffect, useState } from "react"
import Router from "next/router"
import { ApiContext, loginLinks } from "../contexts"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
const LoginRedirecter: React.FC<{ provider: "github" | "discord" }> = ({
	provider,
}) => {
	const [isDone, setIsDone] = useState(false)
	const api = useContext(ApiContext)
	const token =
		globalThis.location && /code=([^&$]+)(?:&|$)/.exec(location.search)?.[1]

	useEffect(() => {
		if (!token) return
		let setResponse = true
		api
			.createToken(token, provider)
			.then(() => setResponse && setIsDone(true))
			.catch(err => {
				console.error(err)
				setResponse && setIsDone(true)
			})
		return (): void => {
			setResponse = false
		}
	}, [token])

	if (!token && globalThis.location) location.assign(loginLinks[provider])

	if (isDone) Router.push("/")

	return (
		<VerticalFrame>
			<FancyName>Logging in...</FancyName>
		</VerticalFrame>
	)
}

export default LoginRedirecter
