import { GetStaticPaths, GetStaticProps, GetServerSideProps } from "next"
import LoginRedirecter from "../../components/LoginRedirecter"
import { loginLinks } from "../../contexts"

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [
			{ params: { provider: "github" } },
			{ params: { provider: "discord" } },
		],
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps = ({ params }) => {
	return {
		props: { provider: params?.provider ?? "github" },
	}
}

export default function AllMods({
	provider,
}: {
	provider: "github" | "discord"
}) {
	return <LoginRedirecter provider={provider} />
}
