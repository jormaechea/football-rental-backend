'use strict';

const BaseError = require('./base');

class Unauthorized extends BaseError {

	get statusCode() {
		return 401;
	}

}

module.exports = Unauthorized;
