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
		const users = await super.list(...args);

		return users.map(user => this.formatUser(user));
	}

	async getById(id) {

		const user = await super.getById(id);

		return this.formatUser(user);
	}

}

module.exports = UserDataSource;
