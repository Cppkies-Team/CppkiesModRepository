import styled from "styled-components"

const FancyName = styled.span`
	margin: 6px 39px auto 39px;
	font-weight: bold;
	position: relative;
	font-variant: small-caps;
	display: inline-block;
	color: #ece2b6;
	text-shadow: 0px 1px 0px #733726, 0px 2px 0px #875626, 0px 2px 1px #000,
		0px 2px 3px #000;
	font-family: Georgia, serif;
	font-size: 15px;
	&:before,
	&:after {
		content: "";
		display: block;
		width: 39px;
		height: 23px;
		position: absolute;
		top: -4px;
	}
	&:before {
		background: url(//orteil.dashnet.org/cookieclicker/img/featherLeft.png)
			no-repeat;
		left: -39px;
	}
	&:after {
		background: url(//orteil.dashnet.org/cookieclicker/img/featherRight.png)
			no-repeat;
		right: -39px;
	}
`

export default FancyName
