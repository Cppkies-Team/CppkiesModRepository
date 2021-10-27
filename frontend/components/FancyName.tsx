import { DetailedHTMLProps, HTMLAttributes, memo } from "react"
import style from "./FancyName.module.scss"
import React from "react"

const FancyName = memo(
	(
		props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
	) => (
		<span
			{...props}
			className={
				style.fancyName + (props.className ? " " + props.className : "")
			}
		/>
	)
)

export default FancyName
