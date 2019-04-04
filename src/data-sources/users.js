'use strict';

const DataSource = require('./data-source');

class UserDataSource extends DataSource {

	static get table() {
		return 'users';
	}

	format(item) {

		item = super.format(item);

		return item && {
			...item,
			fullName: `${item.firstName} ${item.lastName}`.trim()
		};
	}

}

module.exports = UserDataSource;
