let path = require('path');
let nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const modules = {
	loaders: [{
		test: /\.js$/,
		exclude: /node-modules/,
		loaders: ["babel-loader"]
	}]
};

const server = {
	entry: {
		server: './src/server/index.js'
	},
	target: "node",
	externals: [nodeExternals()],
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, 'dist')
	},
	module: modules
};

const client = {
	entry: {
		client: "./src/client/index.js"
	},
	target: "web",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, 'dist/public')
	},
	module: modules,
	plugins: [
		new HtmlWebPackPlugin({
			template: "src/client/index.html"
		})
	]
};

module.exports = [server, client];