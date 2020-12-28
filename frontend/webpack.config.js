const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

module.exports = {
	entry: path.resolve("./src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
		],
	},
	mode: process.env.NODE_ENV,
	resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },
	plugins: [
		new HTMLPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 5500,
	},
}
