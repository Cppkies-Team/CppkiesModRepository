import { DetailedHTMLProps, HTMLAttributes, memo } from "react"
import style from "./Input.module.scss"
import React from "react"

const Input = memo(
	(
		props: DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>
	) => (
		<input
			{...props}
			className={style.input + (props.className ? " " + props.className : "")}
		/>
	)
)

export default Input
