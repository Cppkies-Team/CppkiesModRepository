import React, { useContext, useEffect, useState } from "react"
import Tooltip from "./Tooltip"
import Icon from "./Icon"
import { ApiContext } from "../contexts"
import Button from "./Button"

const UploadButton: React.FC = () => {
	const [, setChangeCounter] = useState(0)
	const [tooltipOpen, setTooltipOpen] = useState(false)
	const [packageLink, setPackageLink] = useState("")
	const api = useContext(ApiContext)

	useEffect(() => {
		const redrawBumper = () => setChangeCounter(Math.random())
		api.on("userChange", redrawBumper)
		return () => api.off("userChange", redrawBumper)
	}, [api])

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
								onClick={() =>
									api.submitMod(packageLink).then(() => location.reload())
								}
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
	else return <></>
}

export default UploadButton
