import styled from "styled-components"
import React from "react"
const BaseButton = styled.span`
	border: 1px solid;
	border-color: #ece2b6 #875526 #733726 #dfbc9a;
	border-radius: 2px;
	background: black;
	text-shadow: 0px 1px 1px #000;
	color: #ccc;
	line-height: 100%;
	display: inline-block;
	margin: 2px 4px 2px 0px;
	font-size: 12px;
	padding: 4px 8px;
	text-decoration: none;
	font-family: Tahoma;
	cursor: pointer;
	user-select: none;

	&:hover {
		text-shadow: none;
		border-color: white;
		color: white;
	}
`

const BadButton = styled(BaseButton)`
	color: #c00;
	border-color: #c00;

	&:hover {
		border-color: #f33;
		color: #f33;
	}
`

const GoodButton = styled(BaseButton)`
	color: #096;
	border-color: #096;

	&:hover {
		border-color: #3c9;
		color: #3c9;
	}
`

interface ButtonProps {
	type?: "normal" | "good" | "bad"
	off?: boolean
	disabled?: boolean
	onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Button: React.FC<ButtonProps> = React.memo(props => {
	const style: React.CSSProperties = {}
	if (props.off || props.disabled) style.opacity = 0.5
	if (props.disabled) {
		style.cursor = "default"
		style.pointerEvents = "none"
	}
	switch (props.type) {
		case undefined:
		case "normal":
			return (
				<BaseButton onClick={props.onClick} style={style}>
					{props.children}
				</BaseButton>
			)
		case "bad":
			return (
				<BadButton onClick={props.onClick} style={style}>
					{props.children}
				</BadButton>
			)
		case "good":
			return (
				<GoodButton onClick={props.onClick} style={style}>
					{props.children}
				</GoodButton>
			)
	}
})

export default Button
