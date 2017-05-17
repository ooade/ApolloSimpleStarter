const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: {
		app: './client/index.js',
		vendor: [
			'react',
			'react-apollo',
			'isomorphic-fetch',
			'react-transition-group'
		]
	},
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[hash:8].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader')
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			fetch: 'isomorphic-fetch',
			CSSTransitionGroup: 'react-transition-group/CSSTransitionGroup'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new HtmlWebpackPlugin({
			template: 'client/index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new ExtractTextPlugin({
			filename: '[name].[chunkhash:5].css',
			allChunks: true
		})
	]
};
