'use strict';

const DataSource = require('./data-source');

class UserDataSource extends DataSource {

	static get table() {
		return 'users';
	}

	async getByEmail(email) {
		return this.getUnique({ email });
	}

}

module.exports = UserDataSource;
