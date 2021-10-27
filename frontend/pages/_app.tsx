import type { AppProps /*, AppContext */ } from "next/app"
import Layout from "../components/Layout"
import Head from "next/head"

import "../styles.css"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Cppkies Mod Repository!</title>
			</Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default MyApp
