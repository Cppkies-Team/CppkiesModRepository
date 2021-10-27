import {
	DetailedHTMLProps,
	FC,
	HTMLAttributes,
	memo,
	MouseEventHandler,
} from "react"
import style from "./Button.module.scss"

type ButtonProps = {
	type?: "normal" | "good" | "bad"
	off?: boolean
	disabled?: boolean
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

const Button: FC<ButtonProps> = memo(props => (
	<span
		{...props}
		className={
			[
				style.button,
				props.disabled && style.disabled,
				props.off && style.off,
				props.type !== "normal" && props.type ? style[props.type] : null,
			]
				.filter(val => val)
				.join(" ") + (props.className ? " " + props.className : "")
		}
	/>
))

export default Button
