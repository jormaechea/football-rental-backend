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
		const item = await mongoConnector.get(this.constructor.table, { _id: id });

		return this.format(item);
	}

	async getUnique(filters) {
		const mongoConnector = await this.mongoConnectorPromise;
		return mongoConnector.get(this.constructor.table, filters);
	}

	async list(filters, paging, sort, textSearch) {
		const mongoConnector = await this.mongoConnectorPromise;
		const listResult = await mongoConnector.list(this.constructor.table, filters, paging, sort, textSearch);

		listResult.items = listResult.items.map(this.format);

		return listResult;
	}

	format(item) {
		return item && {
			id: item._id, // eslint-disable-line no-underscore-dangle
			...item,
			_id: undefined
		};
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
