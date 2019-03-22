'use strict';

const { ApolloServer } = require('apollo-server-lambda');

const { mongoConnectorGetter } = require('../helpers');

const typeDefs = require('../../schemas/users.js');

const UserDataSource = require('../../data-sources/users');

const mongoConnectorPromise = mongoConnectorGetter();

const userDataSource = new UserDataSource(mongoConnectorPromise);

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		list: () => userDataSource.list(),
		get: (obj, { email }) => userDataSource.getById(email)
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ event, context }) => ({
		headers: event.headers,
		functionName: context.functionName,
		event,
		context
	})
});

module.exports.users = server.createHandler();
