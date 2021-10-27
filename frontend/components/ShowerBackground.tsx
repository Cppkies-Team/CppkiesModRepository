import React from "react"

import style from "./ShowerBackground.module.scss"

interface ProppedShowerProps {
	offset?: number
}

const ProppedShower: React.FC<ProppedShowerProps> = React.memo(
	({ offset = 0 }) => {
		return (
			<div
				style={{
					animationDelay: `${offset / -10}s`,
					backgroundPositionX: offset,
				}}
				className={style.showerBackground}
			/>
		)
	}
)

const ShowerBackground: React.FC = React.memo(() => {
	return (
		<div id="shower">
			<ProppedShower />
			<ProppedShower offset={30} />
			<ProppedShower offset={50} />
			<ProppedShower offset={70} />
			<ProppedShower offset={90} />
			<ProppedShower offset={110} />
		</div>
	)
})

export default ShowerBackground
