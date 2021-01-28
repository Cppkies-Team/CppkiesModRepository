import React from "react"
import FancyName from "./FancyName"
import Frame from "./Frame"
import styled from "styled-components"
import UserButton from "./UserButton"
import UploadButton from "./UploadButton"

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
			<UploadButton />
		</div>
		<UserButton />
	</CoolFrame>
)

export default TopBar
