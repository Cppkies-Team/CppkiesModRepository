import React, { useState } from "react"
import { CCIcon } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import styled from "styled-components"
import Tooltip from "./Tooltip"
import Frame from "./Frame"

interface ModCardProps {
	name: string
	icon?: CCIcon
	desc?: string
	version?: string
}

const VersionDisplay = styled.span`
	font-size: 0.67em;
	font-weight: bold;
	user-select: none;
`

const VerticalList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const ModCard: React.FC<ModCardProps> = props => {
	const [inDetails, setInDetails] = useState(false)
	return (
		<Tooltip popup={props.desc}>
			<Frame
				onClick={() => setInDetails(!inDetails)}
				style={{ cursor: "pointer" }}
			>
				<VerticalList style={{ visibility: inDetails ? "hidden" : "unset" }}>
					<FancyName>{props.name}</FancyName>
					{props.version ? (
						<VersionDisplay>v{props.version}</VersionDisplay>
					) : (
						""
					)}
					{props.icon ? <Icon icon={props.icon} /> : ""}
					{props.desc ? <Quote>{props.desc}</Quote> : ""}
				</VerticalList>
			</Frame>
		</Tooltip>
	)
}

export default ModCard
