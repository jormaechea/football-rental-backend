'use strict';

const BaseError = require('./base');

class InvalidRequest extends BaseError {

	get statusCode() {
		return 400;
	}

}

module.exports = InvalidRequest;
