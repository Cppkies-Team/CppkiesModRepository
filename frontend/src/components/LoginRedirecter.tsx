import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { ApiContext, loginLink } from "../contexts"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
const LoginRedirecter: React.FC = () => {
	const [isDone, setIsDone] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	let mounted = true
	useEffect(() => {
		mounted = true
		return () => {
			mounted = false
		}
	}, [])
	return (
		<ApiContext.Consumer>
			{api => {
				const token = /code=([^&$]+)(?:&|$)/.exec(location.search)?.[1]
				if (!isLoading)
					if (token)
						api
							.createToken(token)
							.then(() => {
								if (mounted) setIsDone(true)
							})
							.catch(err => {
								console.error(err)
								if (mounted) setIsDone(true)
							})
					else location.assign(loginLink)

				setIsLoading(true)
				if (isDone) return <Redirect to="/" />
				else
					return (
						<VerticalFrame>
							<FancyName>Logging in...</FancyName>
						</VerticalFrame>
					)
			}}
		</ApiContext.Consumer>
	)
}

export default LoginRedirecter
