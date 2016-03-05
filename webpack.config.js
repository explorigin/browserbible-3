var webpack = require('webpack');
var path = require('path');

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
      loaders: [
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
