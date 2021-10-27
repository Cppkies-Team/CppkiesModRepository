import { DetailedHTMLProps, HTMLAttributes, memo } from "react"
import style from "./Quote.module.scss"
import React from "react"

const Quote = memo(
	(
		props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
	) => (
		<span
			{...props}
			className={style.quote + (props.className ? " " + props.className : "")}
		/>
	)
)

export default Quote
