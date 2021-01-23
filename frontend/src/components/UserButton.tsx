import React, { useState } from "react"
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
	return (
		<ApiContext.Consumer>
			{api => {
				if (changeCounter === 0)
					api.on("userChange", () => setChangeCounter(changeCounter + 1))

				return (
					<Tooltip
						popup={
							api.apiKey ? "Logged in, no user details yet" : "Click to log in"
						}
					>
						<SensibleLink to="login/">
							<Icon icon={[12 + (api.apiKey ? 1 : 0), 6]} />
						</SensibleLink>
					</Tooltip>
				)
			}}
		</ApiContext.Consumer>
	)
}

export default UserButton
