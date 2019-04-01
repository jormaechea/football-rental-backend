'use strict';

const DataSource = require('./data-source');

class UserDataSource extends DataSource {

	static get table() {
		return 'users';
	}

	async list(...args) {
		const users = await super.list(...args);

		return users.map(user => {
			return {
				id: user._id, // eslint-disable-line no-underscore-dangle
				...user,
				_id: undefined
			};
		});
	}

	async getById(id) {

		const user = await super.getById(id);

		return user && {
			id: user._id, // eslint-disable-line no-underscore-dangle
			...user,
			_id: undefined
		};
	}

}

module.exports = UserDataSource;
