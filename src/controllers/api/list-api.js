'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');
const Filter = require('./filter');
const Paging = require('./paging');
const Sort = require('./sort');

class ListApi extends Api {

	setFetcher(fetcher) {
		this.fetcher = fetcher;
	}

	async handleRequest(availableFilters) {

		if(!this.fetcher)
			return new ApiInternalError('No fetcher defined.');

		if(!this.fetcher.list)
			return new ApiInternalError('Invalid fetcher defined.');

		const filter = new Filter(this.req, this.res, availableFilters);
		const paging = new Paging(this.req, this.res);
		const sort = new Sort(this.req, this.res);

		const results = await this.fetcher.list(filter.get(), paging.get(), sort.get());

		return this.sendResponse(results);
	}

}

module.exports = ListApi;
