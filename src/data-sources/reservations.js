'use strict';

const DataSource = require('./data-source');

class Reservations extends DataSource {

	static get table() {
		return 'reservations';
	}

}

module.exports = Reservations;
