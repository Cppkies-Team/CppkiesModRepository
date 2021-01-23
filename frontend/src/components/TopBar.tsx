import React from "react"
import FancyName from "./FancyName"
import Frame from "./Frame"
import styled from "styled-components"
import UserButton from "./UserButton"

const CoolFrame = styled(Frame)`
	margin-top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`
const TopBar: React.FC = () => (
	<CoolFrame>
		<FancyName style={{ position: "absolute" }}>
			Cppkies mod repository
		</FancyName>
		<div style={{ marginLeft: "auto" }}>
			<UserButton />
		</div>
	</CoolFrame>
)

export default TopBar
