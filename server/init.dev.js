// Import webpack modules
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

// Grab our config file
const config = require('../webpack.config');

// Compile with webpack
const compiler = webpack(config);

module.exports = app => {
	app.use(webpackDevMiddleware(compiler));
};
