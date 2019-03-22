'use strict';

const BaseError = require('./base');

class NotFound extends BaseError {

	get statusCode() {
		return 404;
	}

}

module.exports = NotFound;
