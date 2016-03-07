var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var isProduction = process.env.NODE_ENV == 'production';

module.exports = {
		context: path.join(__dirname, 'src'),
		entry: {
			main: './main.js',
			globals: './globals.js'
		},
		devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
		output: {
			path: path.join(__dirname, 'app'),
			filename: '[name].bundle.js'
		},
		resolve: {
			extensions: ['', '.js']
		},
		module: {
			preLoaders: [
				{
					test: /(^resources\/)\.js?$/,
					exclude: /node_modules/,
					loader: 'eslint-loader'
				}
			],
			loaders: [
				{
				  test: /resources\/.*\.js$/,
				  loader: 'promise?global,[name].js'
				},
				{
					test: /\.js?$/,
					exclude: /node_modules/,
					loader: 'babel'
				}
			]
		},
		plugins: (isProduction ? [
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.optimize.AggressiveMergingPlugin(),
			new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
		] : []).concat([
			new HtmlWebpackPlugin({
				inject: false,	// some day we can set this to true
				template: "index.html"
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: "commons",
				filename: "commons.js"
			}),
			new webpack.optimize.UglifyJsPlugin({
				"comments": false,
				"mangle": true,
				"compress": {
					"warnings": false
				}
			})
		])
};
