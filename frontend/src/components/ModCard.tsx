import React, { useState } from "react"
import { Mod } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import styled from "styled-components"
import Tooltip from "./Tooltip"
import Frame from "./Frame"
import Button from "./Button"
import { CMMContext } from "../contexts"

interface ModCardProps {
	mod: Mod
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

const WidthedQuote = styled(Quote)`
	width: 30ch;
`

const ModCard: React.FC<ModCardProps> = ({ mod }) => {
	const [inDetails, setInDetails] = useState(false)
	return (
		<div>
			<Frame
				onClick={() => setInDetails(!inDetails)}
				style={{ cursor: "pointer", position: "relative" }}
			>
				<VerticalList style={{ visibility: inDetails ? "hidden" : "unset" }}>
					<FancyName>{mod.name}</FancyName>
					{mod.version ? <VersionDisplay>v{mod.version}</VersionDisplay> : ""}
					{mod.icon ? <Icon icon={mod.icon} /> : ""}
					{mod.description ? (
						<WidthedQuote>{mod.description}</WidthedQuote>
					) : (
						""
					)}
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
					<CMMContext.Consumer>
						{cmm => {
							const thisMod = cmm.mods.find(val => val.keyname === mod.keyname)
							return (
								<Button
									onClick={event => {
										// Do not flip page
										event.stopPropagation()
										if (!thisMod) cmm.submitMod(mod)
										else cmm.unsubmitMod(mod.keyname)
									}}
									type="good"
								>
									{thisMod ? "Un" : "S"}ubscribe
								</Button>
							)
						}}
					</CMMContext.Consumer>
				</VerticalList>
			</Frame>
		</div>
	)
}

export default ModCard
