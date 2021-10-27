import Frame from "../components/Frame"
import Link from "next/link"

export default function AllMods() {
	return (
		<Frame style={{ textAlign: "center" }}>
			404!
			<br />
			<Link href="/">
				<a>Maybe check out the homepage?</a>
			</Link>
		</Frame>
	)
}
