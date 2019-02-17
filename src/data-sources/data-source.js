'use strict';

const Db = require('../controllers/database/dynamodb');

class DataSource {

	async getById(key) {

		const db = new Db(this.constructor.table);

		return db.getById(key);
	}

	async list() {

		const db = new Db(this.constructor.table);

		const { Items } = await db.list();

		return Items;
	}

}

module.exports = DataSource;
