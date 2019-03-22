'use strict';

const DataSource = require('./data-source');

class UserDataSource extends DataSource {

	static get idField() {
		return 'email';
	}

	static get table() {
		return 'users';
	}

}

module.exports = UserDataSource;
