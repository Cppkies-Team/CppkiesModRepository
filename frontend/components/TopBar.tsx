import React from "react"
import FancyName from "./FancyName"
import Frame from "./Frame"
import style from "./TopBar.module.scss"
import UserButton from "./UserButton"
import UploadButton from "./UploadButton"

const TopBar: React.FC = () => (
	<Frame className={style.topFrame}>
		<FancyName style={{ position: "absolute" }}>
			Cppkies mod repository
		</FancyName>
		<div style={{ marginLeft: "auto" }}>
			<UploadButton />
		</div>
		<UserButton />
	</Frame>
)

export default TopBar
