'use strict';

const { gql } = require('apollo-server-lambda');

module.exports = gql`

schema {
	query: Query,
	mutation: Mutation
}

type Query {
	current: User
	list: [User]
	get(email: ID!): User
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
