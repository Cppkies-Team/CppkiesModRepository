import React, { useState } from "react"
import Tooltip from "./Tooltip"
import Icon from "./Icon"
import { ApiContext } from "../contexts"
import Button from "./Button"

const UploadButton: React.FC = () => {
	const [changeCounter, setChangeCounter] = useState(0)
	const [tooltipOpen, setTooltipOpen] = useState(false)
	const [packageLink, setPackageLink] = useState("")

	return (
		<ApiContext.Consumer>
			{api => {
				if (changeCounter === 0)
					api.on("userChange", () => setChangeCounter(changeCounter + 1))
				if (api.user)
					return (
						<Tooltip
							popup={
								tooltipOpen ? (
									<>
										Insert the link to your package.json.
										<br />
										Click{" "}
										<a href="https://cppkies.js.org/#/ccrepo/package.json">
											here
										</a>{" "}
										for more information.
										<br />
										<input onChange={ev => setPackageLink(ev.target.value)} />
										<Button
											onClick={() => {
												api.submitMod(packageLink).then(() => location.reload())
											}}
										>
											Upload mod!
										</Button>
									</>
								) : (
									"Click to upload a mod!"
								)
							}
							keepOpen={tooltipOpen ? true : null}
						>
							<div
								style={{ cursor: "pointer" }}
								onClick={() => setTooltipOpen(!tooltipOpen)}
							>
								<Icon icon={[5, 0]} />
							</div>
						</Tooltip>
					)
				else return ""
			}}
		</ApiContext.Consumer>
	)
}

export default UploadButton
