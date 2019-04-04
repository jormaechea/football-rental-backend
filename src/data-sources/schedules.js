'use strict';

const DataSource = require('./data-source');

class Schedules extends DataSource {

	static get table() {
		return 'schedules';
	}

}

module.exports = Schedules;
