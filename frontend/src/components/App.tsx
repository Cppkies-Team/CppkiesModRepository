import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"
import ShowerBackground from "./ShowerBackground"
import FancyName from "./FancyName"
import { VerticalFrame } from "./Frame"
import AllModsList from "./AllModsList"
import { ApiContext, defaultApi } from "../contexts"

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<ApiContext.Provider value={defaultApi}>
				<Router>
					<ShowerBackground />
					<VerticalFrame style={{ marginTop: 0 }}>
						<FancyName>Cppkies mod repository</FancyName>
					</VerticalFrame>
					<Switch>
						<Route path="/all">
							<AllModsList />
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
			</ApiContext.Provider>
		)
	}
}
