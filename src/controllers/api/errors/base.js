'use strict';

class Base extends Error {

	get statusCode() {
		throw	Error('Unhandled error');
	}

	get message() {
		return '';
	}

}

module.exports = Base;
