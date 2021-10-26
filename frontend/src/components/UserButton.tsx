import React, { useContext, useEffect, useState } from "react"
import Tooltip from "./Tooltip"
import Icon from "./Icon"
import { ApiContext } from "../contexts"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Button from "./Button"

const SensibleLink = styled(Link)`
	&:focus {
		outline: none;
	}
	display: inline-flex;
	align-items: center;
`

const UserButton: React.FC = () => {
	const [changeCounter, setChangeCounter] = useState(0)
	const api = useContext(ApiContext)
	const [tooltipOpen, setTooltipOpen] = useState(false)

	useEffect(() => {
		const redrawBumper = () => setChangeCounter(Math.random())
		api.on("userChange", redrawBumper)
		return () => api.off("userChange", redrawBumper)
	}, [api])
	return (
		<Tooltip
			popup={
				tooltipOpen ? (
					api.user ? (
						<>
							Logged in as {api.user.username}
							<br />
							Binded platforms: TODO
							<br />
							<Button onClick={() => api.logout()} type="bad">
								Log out
							</Button>
						</>
					) : (
						<>
							Log in via...
							<br />
							<SensibleLink to="/login/discord">
								<Icon link="/assets/loginicons.png" x={0} y={0} />
								discord
							</SensibleLink>
							<br />
							<SensibleLink to="/login/github">
								<Icon link="/assets/loginicons.png" x={1} y={0} />
								github
							</SensibleLink>
						</>
					)
				) : api.user ? (
					<>
						Logged in as {api.user.username}
						<br />
						Click to show more info!
					</>
				) : (
					"Click to show more info!"
				)
			}
			keepOpen={tooltipOpen ? true : null}
		>
			<div
				style={{ cursor: "pointer" }}
				onClick={() => setTooltipOpen(!tooltipOpen)}
			>
				<Icon icon={[12 + (api.user ? 1 : 0) + (api.user?.admin ? 1 : 0), 6]} />
			</div>
		</Tooltip>
	)
}

export default UserButton
