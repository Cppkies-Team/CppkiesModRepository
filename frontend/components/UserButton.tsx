import React, { useContext, useEffect, useState } from "react"
import Tooltip from "./Tooltip"
import Icon from "./Icon"
import { ApiContext } from "../contexts"
import Link from "next/link"
import Button from "./Button"
import style from "./UserButton.module.scss"

const UserButton: React.FC = () => {
	const [, setChangeCounter] = useState(0)
	const api = useContext(ApiContext)
	const [tooltipOpen, setTooltipOpen] = useState(false)

	useEffect(() => {
		const redrawBumper = () => setChangeCounter(Math.random())
		api.on("userChange", redrawBumper)
		return () => api.off("userChange", redrawBumper)
	}, [api])
	return (
		<Tooltip
			popup={
				tooltipOpen ? (
					api.user ? (
						<>
							Logged in as {api.user.username}
							<br />
							Binded platforms:{" "}
							{api.user.bindedPlatforms
								.map(val => val[0].toUpperCase() + val.slice(1))
								.join(", ")}
							<br />
							<Button onClick={() => api.logout()} type="bad">
								Log out
							</Button>
						</>
					) : (
						<>
							Log in via...
							<br />
							<Link href="/login/discord">
								<a className={style.buttonLink}>
									<Icon link="/loginicons.png" x={0} y={0} />
									discord
								</a>
							</Link>
							<br />
							<Link href="/login/github">
								<a className={style.buttonLink}>
									<Icon link="/loginicons.png" x={1} y={0} />
									github
								</a>
							</Link>
						</>
					)
				) : api.user ? (
					<>
						Logged in as {api.user.username}
						<br />
						Click to show more info!
					</>
				) : (
					"Click to show more info!"
				)
			}
			keepOpen={tooltipOpen ? true : null}
		>
			<div
				style={{ cursor: "pointer" }}
				onClick={() => setTooltipOpen(!tooltipOpen)}
			>
				<Icon icon={[12 + (api.user ? 1 : 0) + (api.user?.admin ? 1 : 0), 6]} />
			</div>
		</Tooltip>
	)
}

export default UserButton
