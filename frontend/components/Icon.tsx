import style from "./Icon.module.scss"
import { CCIcon } from "../types"
import React from "react"
import { hasOwnProperty } from "../helpers"

interface IconProps1 {
	x: number
	y: number
	link?: string
}

interface IconProps2 {
	icon: CCIcon
}

const Icon: React.FC<IconProps1 | IconProps2> = React.memo(props => {
	let icon: CCIcon
	if (hasOwnProperty(props, "x")) icon = [props.x, props.y, props.link]
	else icon = props.icon

	return (
		<div
			style={{
				backgroundPosition: `${icon[0] * -48}px ${icon[1] * -48}px`,
				backgroundImage: `url(${
					icon[2] ?? "//orteil.dashnet.org/cookieclicker/img/icons.png"
				})`,
			}}
			className={style.icon}
		/>
	)
})

export default Icon
