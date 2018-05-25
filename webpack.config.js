let path = require('path');
let nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

const modules = {
	loaders: [{
		test: /\.js$/,
		exclude: /node-modules/,
		loaders: ["babel-loader"]
	}, {
		test: /\.css/,
		loaders: ["style-loader", "css-loader"]
	},
	{ 
		test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, 
		loader: "file-loader" 
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
	devtool: "source-map",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, 'dist/public')
	},
	module: modules,
	plugins: [
		new HtmlWebPackPlugin({
			template: "src/client/index.html"
		}),
		new GenerateSW()
	]
};

module.exports = [server, client];