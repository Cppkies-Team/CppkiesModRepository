import styled from "styled-components"
import { Mod } from "../types"
import React from "react"
import ModCard from "./ModCard"

const BaseRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
`

interface ModRowProps {
	mods: Mod[]
}

const ModList: React.FC<ModRowProps> = props => {
	return (
		<BaseRow>
			{props.mods.map(mod => (
				<ModCard
					name={mod.name}
					desc={mod.desc}
					icon={mod.icon}
					version={mod.version}
					key={mod.id}
				/>
			))}
		</BaseRow>
	)
}

export default ModList
