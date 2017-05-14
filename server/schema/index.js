const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const resolvers = {
	Query: {
		todos() {
			return Todo.find();
		}
	},
	Mutation: {
		addTodo(root, args) {
			const todo = new Todo(args);
			todo.save();
			return todo;
		},
		removeTodo(root, { id }) {
			Todo.findByIdAndRemove(id).exec().then(() => {
				console.log('deleted todo', id);
			});
		}
	}
};

const typeDefs = `
	type Todo {
		id: ID
		todo: String
	}

	type Query {
		todos: [Todo]
	}

	type Mutation {
		addTodo(id: ID!, todo: String!): Todo
		removeTodo(id: ID!): Todo
	}

	schema {
		query: Query
		mutation: Mutation
	}
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
