module.exports = app => {
	const webpack = require('webpack');
	const webpackConfig = require('../webpack.config');
	const webpackDevMiddleware = require('webpack-dev-middleware');

	app.use(webpackDevMiddleware(webpack(webpackConfig)));
};
