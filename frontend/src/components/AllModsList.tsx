import React, { useContext, useEffect, useState } from "react"
import { Mod } from "../types"
import ModList from "./ModList"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
import { ApiContext } from "../contexts"
import { CMMMod } from "../cmm-api"

const AllModsList: React.FC = () => {
	const [isError, setIsError] = useState(false)
	const [result, setResult] = useState<Mod[] | null>(null)
	const api = useContext(ApiContext)

	useEffect(() => {
		let recordResult = true
		api
			.getMods()
			.then(res => recordResult && setResult(res))
			.catch(() => recordResult && setIsError(true))
		return () => {
			recordResult = false
		}
	}, [])
	if (result) return <ModList mods={result} />
	return (
		<VerticalFrame>
			<FancyName>{isError ? "Something went wrong!" : "Loading..."}</FancyName>
		</VerticalFrame>
	)
}
export default AllModsList
