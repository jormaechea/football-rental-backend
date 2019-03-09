'use strict';


class DataSource {

	constructor(mongoConnectorPromise) {
		this.mongoConnectorPromise = mongoConnectorPromise;
	}

	async getById(id) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.get(this.constructor.table, { _id: id });
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
