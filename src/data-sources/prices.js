'use strict';

const DataSource = require('./data-source');

class PricesDataSource extends DataSource {

	static get table() {
		return 'prices';
	}

}

module.exports = PricesDataSource;
