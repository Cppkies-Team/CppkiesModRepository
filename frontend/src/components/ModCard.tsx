import React, { useState } from "react"
import { CCIcon } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import styled from "styled-components"
import Tooltip from "./Tooltip"
import Frame from "./Frame"
import Button from "./Button"

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
				style={{ cursor: "pointer", position: "relative" }}
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
				<VerticalList
					style={{
						// Mm, CSS
						visibility: !inDetails ? "hidden" : "unset",
						position: "absolute",
						top: 0,
						right: 0,
						width: "100%",
						height: "100%",
						justifyContent: "center",
					}}
				>
					<Button
						onClick={event => {
							// Do not flip page
							event.stopPropagation()
							// TODO: Communicate with addon
						}}
						type="good"
					>
						Subscribe
					</Button>
				</VerticalList>
			</Frame>
		</Tooltip>
	)
}

export default ModCard
