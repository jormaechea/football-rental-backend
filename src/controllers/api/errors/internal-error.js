'use strict';

const BaseError = require('./base');

class InternalError extends BaseError {

	get statusCode() {
		return 500;
	}

}

module.exports = InternalError;
