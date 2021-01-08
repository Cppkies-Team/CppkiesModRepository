import analyze from "rollup-plugin-analyzer"
import minify from "rollup-plugin-babel-minify"
import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

export default {
	input: "./src/index.ts",
	output: {
		file: "./dist/index.js",
		format: "umd",
		name: "CCRepoAPI",
		sourcemap: true,
	},
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		resolve({ preferBuiltins: true, browser: true }),
		analyze({
			summaryOnly: true,
		}),
		minify({
			comments: false,
		}),
		commonjs(),
		json(),
	],
}
