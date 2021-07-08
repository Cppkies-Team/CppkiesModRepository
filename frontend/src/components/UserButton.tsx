import React, { useContext, useEffect, useState } from "react"
import Tooltip from "./Tooltip"
import Icon from "./Icon"
import { ApiContext } from "../contexts"
import { Link } from "react-router-dom"
import styled from "styled-components"

const SensibleLink = styled(Link)`
	&:focus {
		outline: none;
	}
`

const UserButton: React.FC = () => {
	const [changeCounter, setChangeCounter] = useState<number>(0)
	const api = useContext(ApiContext)
	useEffect(() => {
		const redrawBumper = () => setChangeCounter(changeCounter + 1)
		api.on("userChange", redrawBumper)
		return () => api.off("userChange", redrawBumper)
	}, [])
	return (
		<Tooltip
			popup={
				api.user ? (
					<div>Logged in as {api.user.username}</div>
				) : (
					"Click to log in"
				)
			}
		>
			<SensibleLink to="login/discord">
				<Icon icon={[12 + (api.user ? 1 : 0) + (api.user?.admin ? 1 : 0), 6]} />
			</SensibleLink>
		</Tooltip>
	)
}

export default UserButton
