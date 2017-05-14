// Grab our required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const webpack = require('webpack');
const WebpackConfig = require('../webpack.config');
const WebpackDevMiddleware = require('webpack-dev-middleware');

const PORT = process.env.PORT || 8080;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ApolloSS');
mongoose.Promise = global.Promise;

// Grab our schema
const schema = require('./schema');

const app = express();
app.use(bodyParser.json());

// Setup graphql and graphqli :p
app.use(
	'/graphql',
	graphqlExpress({
		schema
	})
);

app.use(
	'/graphiql',
	graphiqlExpress({
		endpointURL: '/graphql'
	})
);

// Use webpack to bundle our client
app.use(WebpackDevMiddleware(webpack(WebpackConfig)));

const server = createServer(app);

server.listen(PORT, () => console.log('Server listening on port', PORT));
