import React, { useContext, useEffect, useState } from "react"
import { Mod } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import styled from "styled-components"
import Tooltip from "./Tooltip"
import Frame from "./Frame"
import Button from "./Button"
import { CMMContext, useCMMMod } from "../contexts"
import Input from "./Input"

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
	const [showCopied, setShowCopied] = useState(false)
	const cmm = useContext(CMMContext)
	const thisMod = useCMMMod(mod.keyname)

	useEffect(() => {
		if (!showCopied) return
		const timeoutId = setTimeout(
			() => setShowCopied(false),
			750
		) as unknown as number
		return () => clearTimeout(timeoutId)
	}, [showCopied])
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
					{(location.protocol === "https:" ||
						location.hostname === "localhost") && (
						<Button
							onClick={async event => {
								// Do not flip page
								event.stopPropagation()
								await navigator.clipboard.writeText(
									new URL(mod.entrypoint, mod.packageLink).href
								)
								setShowCopied(true)
							}}
						>
							{showCopied ? "Copied!" : "Copy link"}
						</Button>
					)}
					{cmm.connected && (
						<Button
							onClick={event => {
								// Do not flip page
								event.stopPropagation()
								if (!thisMod) cmm.submitMod(mod)
								else cmm.unsubmitMod(mod.keyname)
							}}
							type="good"
						>
							{thisMod ? "Uns" : "S"}ubscribe
						</Button>
					)}
				</VerticalList>
			</Frame>
		</div>
	)
}

export default ModCard
