import { FC } from "react"
import { ApiContext, CMMContext, defaultApi, defaultCMMApi } from "../contexts"
import ShowerBackground from "./ShowerBackground"
import TopBar from "./TopBar"

const Layout: FC = props => (
	<ApiContext.Provider value={defaultApi}>
		<CMMContext.Provider value={defaultCMMApi}>
			<ShowerBackground />
			<TopBar />
			{props.children}
		</CMMContext.Provider>
	</ApiContext.Provider>
)

export default Layout
