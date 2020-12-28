import React from "react"
import { CCIcon } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import { VerticalFrame } from "./Frame"
import styled from "styled-components"

interface ModCardProps {
	name: string
	icon?: CCIcon
	desc?: string
	version?: string
}

const VersionDisplay = styled.span`
	font-size: 0.67em;
	font-weight: bold;
`

const ModCard: React.FC<ModCardProps> = props => {
	return (
		<VerticalFrame>
			<FancyName>{props.name}</FancyName>
			{props.version ? <VersionDisplay>v{props.version}</VersionDisplay> : ""}
			{props.icon ? <Icon icon={props.icon} /> : ""}
			{props.desc ? <Quote>{props.desc}</Quote> : ""}
		</VerticalFrame>
	)
}

export default ModCard
