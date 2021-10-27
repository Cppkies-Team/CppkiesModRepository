import style from "./ModList.module.scss"
import { Mod } from "../types"
import React from "react"
import ModCard from "./ModCard"

interface ModRowProps {
	mods: Mod[]
}

const ModList: React.FC<ModRowProps> = props => {
	return (
		<div className={style.modList}>
			{props.mods.map((mod, i) => (
				<ModCard mod={mod} key={i} />
			))}
		</div>
	)
}

export default ModList
