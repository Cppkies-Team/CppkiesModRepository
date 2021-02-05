import React, { useState } from "react"
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
import { ApiContext, defaultApi, CMMContext, defaultCMMApi } from "../contexts"
import LoginRedirecter from "./LoginRedirecter"
import TopBar from "./TopBar"

export default class App extends React.Component {
	render(): JSX.Element {
		return (
			<ApiContext.Provider value={defaultApi}>
				<CMMContext.Provider value={defaultCMMApi}>
					<Router>
						<ShowerBackground />
						<TopBar />
						<Switch>
							<Route path="/all">
								<AllModsList />
							</Route>
							{/* TODO: Main page*/}
							<Redirect exact from="/" to="/all" />
							<Route path="/login/">
								<LoginRedirecter />
							</Route>
							<Route path="*">
								<VerticalFrame>
									<FancyName>404!</FancyName>
								</VerticalFrame>
							</Route>
						</Switch>
					</Router>
				</CMMContext.Provider>
			</ApiContext.Provider>
		)
	}
}
