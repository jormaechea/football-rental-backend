'use strict';

const DataSource = require('./data-source');

class FieldsDataSource extends DataSource {

	static get table() {
		return 'fields';
	}

}

module.exports = FieldsDataSource;
