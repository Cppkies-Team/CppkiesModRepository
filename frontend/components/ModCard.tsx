import React, { useContext, useEffect, useState } from "react"
import { Mod } from "../types"
import Icon from "./Icon"
import Quote from "./Quote"
import FancyName from "./FancyName"
import style from "./ModCard.module.scss"
import Frame from "./Frame"
import Button from "./Button"
import { CMMContext, useCMMMod } from "../contexts"

interface ModCardProps {
	mod: Mod
}

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
				<div
					style={{ visibility: inDetails ? "hidden" : "unset" }}
					className={style.panel}
				>
					<FancyName>{mod.name}</FancyName>
					{mod.version ? (
						<span className={style.version}>v{mod.version}</span>
					) : (
						""
					)}
					{mod.icon ? <Icon icon={mod.icon} /> : ""}
					{mod.description ? (
						<Quote className={style.quoteLength}>{mod.description}</Quote>
					) : (
						""
					)}
				</div>

				<div
					style={{
						// Mm, CSS
						visibility: !inDetails ? "hidden" : "unset",
					}}
					className={style.additionalPanel}
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
				</div>
			</Frame>
		</div>
	)
}

export default ModCard
