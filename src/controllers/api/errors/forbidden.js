'use strict';

const BaseError = require('./base');

class Forbidden extends BaseError {

	get statusCode() {
		return 403;
	}

}

module.exports = Forbidden;
