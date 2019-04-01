'use strict';


class DataSource {

	static get table() {
		throw new Error('Invalid data source');
	}

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

	async list(filters, paging, sort) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.list(this.constructor.table, filters, paging, sort);
	}

	async updateById(id, document) {

		const filter = {
			_id: id
		};

		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.insertUpdate(this.constructor.table, filter, document);
	}

	async insertUpdate(document, filter) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.insertUpdate(this.constructor.table, filter, document);
	}

}

module.exports = DataSource;
