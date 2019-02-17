'use strict';

const { ApolloServer } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = require('./src/schemas/users.js');

const UserDataSource = require('./src/data-sources/users');

const userDataSource = new UserDataSource();

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		users: () => userDataSource.list(),
		user: (obj, { email }) => userDataSource.getById({ email })
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports.users = server.createHandler();
