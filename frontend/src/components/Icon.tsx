import styled from "styled-components"
import { CCIcon as CCIcon } from "../types"
import React from "react"
import { hasOwnProperty } from "../helpers"

const IconBase = styled.div`
	width: 48px;
	height: 48px;
	display: inline-block;
`
interface IconProps1 {
	x: number
	y: number
	link?: string
}

interface IconProps2 {
	icon: CCIcon
}

export default class Icon extends React.Component<IconProps1 | IconProps2> {
	render(): JSX.Element {
		let icon: CCIcon
		if (hasOwnProperty(this.props, "x"))
			icon = [this.props.x, this.props.y, this.props.link]
		else icon = this.props.icon

		return (
			<IconBase
				style={{
					backgroundPosition: `${icon[0] * -48}px ${icon[1] * -48}px`,
					backgroundImage: `url(${
						icon[2] ?? "//orteil.dashnet.org/cookieclicker/img/icons.png"
					})`,
				}}
			/>
		)
	}
}
