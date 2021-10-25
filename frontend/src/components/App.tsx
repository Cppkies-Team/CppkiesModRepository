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
import WelcomeNote from "./WelcomeNote"

const App: React.FC = () => (
	<ApiContext.Provider value={defaultApi}>
		<CMMContext.Provider value={defaultCMMApi}>
			<Router>
				<ShowerBackground />
				<TopBar />
				<Switch>
					<Route path="/all">
						<AllModsList />
					</Route>
					<Route path="/" exact>
						<WelcomeNote />
						<AllModsList />
					</Route>
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
export default App
