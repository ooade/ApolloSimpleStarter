// Grab our required dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');

const PORT = process.env.PORT || 8080;
const MONGO_URI = 'mongodb://heroku_x4xnglm7:em5c6br38p6molbe25j3qfqod6@ds011880.mlab.com:11880/heroku_x4xnglm7';

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI || MONGO_URI);
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

const devInit = require('./init.dev');
const prodInit = require('./init.prod');

if (process.env.NODE_ENV !== 'production') {
	// Build with webpack at run time
	devInit(app);
} else {
	// Use prebuilt build in production ¯\_(ツ)_/¯
	prodInit(app);
}

app.listen(PORT, () => console.log('Server listening on port', PORT));
