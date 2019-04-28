'use strict';

const DataSource = require('./data-source');

class Customers extends DataSource {

	static get table() {
		return 'customers';
	}

	format(item) {

		item = super.format(item);

		return item && {
			...item,
			fullName: `${item.firstName} ${item.lastName}`.trim()
		};
	}

}

module.exports = Customers;
