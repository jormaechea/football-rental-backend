'use strict';

const AWS = require('aws-sdk');

let dbInstance;

class DynamoDb {

	constructor(table) {
		this.table = table;
	}

	static get db() {

		if(!dbInstance)
			dbInstance = new AWS.DynamoDB.DocumentClient();

		return dbInstance;
	}


	async getById(key) {

		const { Item } = await this.constructor.db.get({
			TableName: this.table,
			Key: key
		}).promise();

		return Item;
	}

	async list() {
		return this.constructor.db.scan({
			TableName: this.table
		}).promise();
	}

}

module.exports = DynamoDb;
