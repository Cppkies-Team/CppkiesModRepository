import Frame from "./Frame"
import React from "react"
import styled from "styled-components"

const TextCenteredFrame = styled(Frame)`
	text-align: center;
`

const WelcomeNote: React.FC = React.memo(() => (
	<TextCenteredFrame>
		Welcome! This is the Cppkies Mod Repository, also commonly known as CCRepo!
		<br />
		This is a list of mods for Cookie Clicker. Currently, this supports only Web
		mods and not Steam ones, but there will be support for that later. <br />
		Anyone can submit a mod, as long as it has a package.json file and has some
		CCRepo-specific parameters. Unfortunately, the process is not documented yet
		(as the documention will be on Cppkies' site, which is not updated yet), so
		maybe you can make an issue{" "}
		<a
			href="https://github.com/Cppkies-Team/CppkiesModRepository"
			target="_blank"
		>
			here
		</a>{" "}
		and we will explain the process.
		<br />
		If you happen to use Cppkies Mod Manager (
		<a
			href="https://chrome.google.com/webstore/detail/cppkies-mod-manager/bjooleocnlcahbnfieoojeijeddfdnfe"
			target="_blank"
		>
			Chrome
		</a>
		,{" "}
		<a
			href="https://addons.mozilla.org/en-US/firefox/addon/cppkies-mod-manager/"
			target="_blank"
		>
			Firefox
		</a>
		) you can click the Subscribe button to add it to your mod list!
		<br />
		You can login with either Discord or Github to upload mods! There's no way
		to merge the accounts so that both log in to the same account, but that will
		be a thing!
		<br />
		Do note that the Cppkies version this is supposed to co-launch with (0.3) is
		not out yet, so this is a bit of a preview than an actual production service
		as of now.
	</TextCenteredFrame>
))

export default WelcomeNote
