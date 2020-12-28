import React from "react"
import Icon from "./Icon"
import ShowerBackground from "./ShowerBackground"
import Frame from "./Frame"
import FancyName from "./FancyName"

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<>
				<ShowerBackground />
				<Icon icon={[5, 1]} />
				<Frame>
					<FancyName>Cppkies mod repository</FancyName>
				</Frame>
			</>
		)
	}
}
