'use strict';

const fs = require('fs');
const { ObjectId, MongoClient } = require('mongodb');

const caBundle = fs.readFileSync(`${__dirname}/../../../ssl/rds-combined-ca-bundle.pem`, 'utf-8');

let dbHandler;

class MongoConnector {

	constructor(endpoint, user, password, dbName, port = 27017, useSsl = false) {

		if(user && password)
			this.endpoint = `mongodb://${user}:${password}@${endpoint}:${port}`;
		else
			this.endpoint = `mongodb://${endpoint}:${port}`;

		this.dbName = dbName;
		this.useSsl = useSsl;
	}

	connect(cachedDb) {

		if(cachedDb) {
			dbHandler = cachedDb;
			return Promise.resolve(cachedDb);
		}

		return MongoClient.connect(this.endpoint, {
			ssl: !!this.useSsl,
			sslCA: this.useSsl ? caBundle : undefined,
			connectTimeoutMS: 1000,
			socketTimeoutMS: 1000
		}).then(client => {
			dbHandler = client.db(this.dbName);
			return dbHandler;
		});
	}

	async insert(collectionName, document) {

		await this.connect(dbHandler);

		return dbHandler.collection(collectionName)
			.insertOne(document)
			.then(({ ops }) => ops[0]);
	}

	async insertUpdate(collectionName, filter, document, options = {}) {

		await this.connect(dbHandler);

		if(filter) {

			// Enable insert-update
			options.upsert = true;

			if(filter._id) // eslint-disable-line no-underscore-dangle
				filter._id = new ObjectId(filter._id); // eslint-disable-line no-underscore-dangle

			return dbHandler.collection(collectionName)
				.updateOne(filter, {
					$set: document
				}, options)
				.then(res => {

					if(!res.result || !res.result.ok)
						return null;

					if(filter._id) // eslint-disable-line no-underscore-dangle
						return filter._id.toString(); // eslint-disable-line no-underscore-dangle

					return res.upsertedId && res.upsertedId._id ? res.upsertedId._id : null; // eslint-disable-line no-underscore-dangle
				});
		}

		return dbHandler.collection(collectionName)
			.insertOne(document, options)
			.then(res => (res.insertedId || null)); // eslint-disable-line no-underscore-dangle
	}

	async list(collectionName, filters, paging, sort) {

		await this.connect(dbHandler);

		const options = {};

		if(paging) {
			options.skip = paging.start;
			options.limit = paging.end - paging.start;
		}

		const listResult = dbHandler.collection(collectionName)
			.find(filters, options);

		if(sort) {
			listResult.sort({
				[sort.field]: sort.direction === 'asc' ? 1 : -1
			});
		}

		return {
			items: await listResult.toArray(),
			totalItems: await listResult.count(false)
		};
	}

	async get(collectionName, filters) {

		await this.connect(dbHandler);

		if(filters._id) // eslint-disable-line no-underscore-dangle
			filters._id = new ObjectId(filters._id); // eslint-disable-line no-underscore-dangle

		return dbHandler.collection(collectionName)
			.findOne(filters);
	}

	async aggregate(collectionName, pipeline) {

		await this.connect(dbHandler);

		return dbHandler.collection(collectionName)
			.aggregate(pipeline)
			.toArray();
	}

	async getIndexes(collectionName) {

		await this.connect(dbHandler);

		return dbHandler.collection(collectionName)
			.indexes();
	}

	async createIndex(collectionName, index) {

		await this.connect(dbHandler);

		const indexKey = index.key;

		delete index.key;

		return dbHandler.collection(collectionName)
			.createIndex(indexKey, index);
	}

	async dropIndex(collectionName, indexName) {

		await this.connect(dbHandler);

		return dbHandler.collection(collectionName)
			.dropIndex(indexName);
	}

	async getCollections() {

		await this.connect(dbHandler);

		return dbHandler.collections();
	}

	async createCollection(collectionName) {

		await this.connect(dbHandler);

		return dbHandler.createCollection(collectionName);
	}

}

module.exports = MongoConnector;
