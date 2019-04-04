'use strict';

const DataSource = require('./data-source');

class Customers extends DataSource {

	static get table() {
		return 'customers';
	}

}

module.exports = Customers;
