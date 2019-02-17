'use strict';

const { gql } = require('apollo-server-lambda');

module.exports = gql`
schema {
	query: Query,
	mutation: Mutation
}

type Query {
	message: String
	currentUser: User
	users: [User]
	user(email: ID!): User
}

scalar Date

type User {
	email: ID!
	password: String!
	firstName: String
	lastName: String
	isActive: Boolean!
	emailVerified: Boolean!
	lastLogin: Date
}

type Mutation {
	addUser(email: ID!, password: String!, firstName: String, lastName: String): User
}
`;
