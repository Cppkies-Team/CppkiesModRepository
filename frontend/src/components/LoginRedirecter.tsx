import React, { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { ApiContext, loginLinks } from "../contexts"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
const LoginRedirecter: React.FC = () => {
	const [isDone, setIsDone] = useState(false)
	const api = useContext(ApiContext)
	const token = /code=([^&$]+)(?:&|$)/.exec(location.search)?.[1]
	const provider = /login\/(\w+)/.exec(location.pathname)?.[1] as
		| "github"
		| "discord"

	if (!provider) return <Redirect to="/" />

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
	}, [])

	if (!token) location.assign(loginLinks[provider])

	if (isDone) return <Redirect to="/" />
	else
		return (
			<VerticalFrame>
				<FancyName>Logging in...</FancyName>
			</VerticalFrame>
		)
}

export default LoginRedirecter
