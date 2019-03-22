'use strict';


class DataSource {

	static get idField() {
		return '_id';
	}

	static get table() {
		throw new Error('Invalid data source');
	}

	constructor(mongoConnectorPromise) {
		this.mongoConnectorPromise = mongoConnectorPromise;
	}

	async getById(id) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.get(this.constructor.table, { [this.constructor.idField]: id });
	}

	async getUnique(filters) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.get(this.constructor.table, filters);
	}

	async list(filters) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.list(this.constructor.table, filters);
	}

}

module.exports = DataSource;
