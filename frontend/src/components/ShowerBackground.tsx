import styled from "styled-components"
import React from "react"

const ShowerBase = styled.div`
	@keyframes scroll {
		from {
			background-position-y: 0px;
		}

		to {
			background-position-y: 512px;
		}
	}
	background-image: url(//orteil.dashnet.org/cookieclicker/img/cookieShower3.png);
	z-index: -999;
	width: 100%;
	height: 100%;
	animation: 5s linear 0s infinite forwards running scroll;
	position: absolute;
`

interface ProppedShowerProps {
	offset?: number
}

const ProppedShower: React.FC<ProppedShowerProps> = ({ offset = 0 }) => {
	return (
		<ShowerBase
			style={{
				animationDelay: `${offset / -10}s`,
				backgroundPositionX: offset,
			}}
		/>
	)
}

const ShowerBackground: React.FC = () => {
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
}

export default ShowerBackground
