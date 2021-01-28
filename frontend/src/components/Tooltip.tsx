import React, { useState } from "react"
import { usePopper } from "react-popper"
import Frame from "./Frame"
import { Placement } from "@popperjs/core"
interface TooltipProps {
	popup: React.ReactNode
	placement?: Placement
	flip?: boolean
	keepOpen?: boolean | null
	allowHoveringOnPopup?: boolean
}

const Tooltip: React.FC<TooltipProps> = props => {
	const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
		null
	)
	const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
	const [hovered, setHovered] = useState(props.keepOpen ?? false)
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: props.placement ?? "right",
		modifiers: [{ name: "flip", enabled: props.flip ?? true }],
	})

	function updateHoverState(newState: boolean, fromPopup?: boolean): void {
		if (fromPopup) {
			if (props.allowHoveringOnPopup) setHovered(newState)
		} else if (typeof props.keepOpen !== "boolean") setHovered(newState)
	}

	return (
		<>
			<div
				ref={setReferenceElement}
				onMouseOver={() => updateHoverState(true)}
				onMouseOut={() => updateHoverState(false)}
				className="tooltipBase"
			>
				{props.children}
			</div>
			{hovered && (
				<Frame
					ref={setPopperElement}
					style={{ ...styles.popper, zIndex: 999, margin: 0 }}
					onMouseOver={() => updateHoverState(true, true)}
					onMouseOut={() => updateHoverState(false, true)}
					{...attributes.popper}
				>
					{props.popup}
				</Frame>
			)}
		</>
	)
}

export default Tooltip
