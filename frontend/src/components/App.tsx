import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
	Redirect,
} from "react-router-dom"
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
	version: "1.2.3",
}

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<Router>
				<ShowerBackground />
				<VerticalFrame style={{ marginTop: 0 }}>
					<FancyName>Cppkies mod repository</FancyName>
				</VerticalFrame>
				<Switch>
					<Route path="/all">
						<ModList mods={Array(10).fill(mod)} />
					</Route>
					{/* TODO: Main page*/}
					<Redirect exact from="/" to="/all" />
					<Route path="*">
						<VerticalFrame>
							<FancyName>404!</FancyName>
						</VerticalFrame>
					</Route>
				</Switch>
			</Router>
		)
	}
}
