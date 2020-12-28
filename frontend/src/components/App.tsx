import React from "react"
import ShowerBackground from "./ShowerBackground"
import FancyName from "./FancyName"
import { CCIcon } from "../types"
import { VerticalFrame } from "./Frame"
import ModList from "./ModList"

const mod = {
	name: "Cppkies",
	icon: [
		0,
		0,
		"https://rawcdn.githack.com/Cppkies-Team/Cppkies/dd053401fe636f168a4be80725a2e31685eb24e8/static/Cppkies48x48.png",
	] as CCIcon,
	desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	id: 1,
	version: "1.2.3",
}

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<>
				<ShowerBackground />
				<VerticalFrame>
					<FancyName>Cppkies mod repository</FancyName>
				</VerticalFrame>
				<ModList mods={Array(10).fill(mod)} />
			</>
		)
	}
}
