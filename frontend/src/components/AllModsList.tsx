import React, { useState } from "react"
import { Mod } from "../types"
import ModList from "./ModList"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
import { ApiContext, CMMContext } from "../contexts"
import { CMMMod } from "../cmm-api"

const AllModsList: React.FC = () => {
	const [isError, setIsError] = useState(false)
	const [result, setResult] = useState<Mod[] | null>(null)
	const [CMMMods, setCMMMods] = useState<CMMMod[] | null>(null)

	return (
		<>
			<CMMContext.Consumer>
				{api => {
					if (!CMMMods) {
						api.on("modChange", () => setCMMMods(api.mods))
						setCMMMods(api.mods)
					}
					return ""
				}}
			</CMMContext.Consumer>
			<ApiContext.Consumer>
				{api => {
					if (api && !isError && !result)
						api
							.getMods()
							.then(res => setResult(res))
							.catch(() => setIsError(true))
					if (result) return <ModList mods={result} />
					return (
						<VerticalFrame>
							<FancyName>
								{isError ? "Something went wrong!" : "Loading..."}
							</FancyName>
						</VerticalFrame>
					)
				}}
			</ApiContext.Consumer>
		</>
	)
}
export default AllModsList
