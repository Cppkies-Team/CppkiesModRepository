import React, { useState } from "react"
import { usePopper } from "react-popper"
import Frame from "./Frame"
import { Placement } from "@popperjs/core"
interface TooltipProps {
	popup: React.ReactNode
	placement?: Placement
	flip?: boolean
}

const Tooltip: React.FC<TooltipProps> = props => {
	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
		null
	)
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
	const [hovered, setHovered] = useState(false)
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: props.placement ?? "right",
		modifiers: [{ name: "flip", enabled: props.flip ?? true }],
	})

	return (
		<>
			<div
				ref={setReferenceElement}
				onMouseOver={() => setHovered(true)}
				onMouseOut={() => setHovered(false)}
			>
				{props.children}
			</div>
			{hovered && (
				<Frame
					ref={setPopperElement}
					style={{ ...styles.popper, zIndex: 999, margin: 0 }}
					{...attributes.popper}
				>
					{props.popup}
				</Frame>
			)}
		</>
	)
}

export default Tooltip
