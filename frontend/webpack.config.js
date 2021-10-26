const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
	entry: path.resolve("./src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
		publicPath: "/",
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
		new CopyPlugin({
			patterns: [{ from: "./src/assets", to: "./assets" }],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 5500,
		historyApiFallback: true,
		writeToDisk: true,
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					chunks: "all",
					name: "vendor",
					test: /node_modules/,
				},
			},
		},
	},
}
