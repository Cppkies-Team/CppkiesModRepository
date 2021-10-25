import React from "react"
import { render } from "react-dom"
import { createGlobalStyle } from "styled-components"
import App from "./components/App"
const Style = createGlobalStyle`
	body {
		margin: 0;
		position: relative;
		font-family: Tahoma, Arial, sans-serif;
		background: url(//orteil.dashnet.org/cookieclicker/img/darkNoise.jpg) black;
		min-height: 100vh;
		overflow-x: hidden;
	}
	a, a:visited {
		text-decoration: underline;
		cursor: pointer;
		color: #ccc;
	}
`
render(
	<React.StrictMode>
		<Style />
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)
