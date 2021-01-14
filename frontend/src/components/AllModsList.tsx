import React, { useState } from "react"
import { Mod } from "../types"
import ModList from "./ModList"
import { VerticalFrame } from "./Frame"
import FancyName from "./FancyName"
import { ApiContext } from "../contexts"

const AllModsList: React.FC = () => {
	const [isError, setIsError] = useState(false)
	const [result, setResult] = useState<Mod[] | null>(null)

	return (
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
	)
}
export default AllModsList
