'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');
const NotFound = require('./errors/not-found');

class GetApi extends Api {

	setFetcher(fetcher) {
		this.fetcher = fetcher;
	}

	async handleRequest() {

		if(!this.fetcher)
			return new ApiInternalError('No fetcher defined.');

		if(!this.fetcher.list)
			return new ApiInternalError('Invalid fetcher defined.');

		const result = await this.fetcher.getById(this.req.params[this.fetcher.constructor.idField]);

		if(!result)
			return this.sendResponse(null, new NotFound('Resource not found'));

		return this.sendResponse(result);
	}

}

module.exports = GetApi;
