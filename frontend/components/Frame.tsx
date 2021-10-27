import { memo, DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import style from "./Frame.module.scss"
import React from "react"

const Frame = React.forwardRef<
	HTMLDivElement,
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(
	(
		props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
		ref
	) => (
		<div
			ref={ref}
			{...props}
			className={style.frame + (props.className ? " " + props.className : "")}
		/>
	)
)

export default Frame

export const VerticalFrame = memo(
	(
		props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	) => (
		<div
			{...props}
			className={
				style.verticalFrame + (props.className ? " " + props.className : "")
			}
		/>
	)
)
