'use strict';

const DataSource = require('./data-source');

class UserDataSource extends DataSource {

	static get table() {
		return 'users';
	}

	formatUser(user) {
		return user && {
			id: user._id, // eslint-disable-line no-underscore-dangle
			...user,
			_id: undefined
		};
	}

	async list(...args) {

		const listResult = await super.list(...args);

		listResult.items = listResult.items.map(user => this.formatUser(user));

		return listResult;
	}

	async getById(id) {

		const user = await super.getById(id);

		return this.formatUser(user);
	}

}

module.exports = UserDataSource;
