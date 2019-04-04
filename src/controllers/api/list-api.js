'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');
const Filter = require('./filter');
const Paging = require('./paging');
const Sort = require('./sort');

class ListApi extends Api {

	async handleRequest(availableFilters, textSearchParam) {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.list)
			return new ApiInternalError('Invalid dataSource defined.');

		const filter = new Filter(this.req, availableFilters);
		const paging = new Paging(this.req, this.res);
		const sort = new Sort(this.req);

		const textSearch = (textSearchParam && this.req.query[textSearchParam]) || null;

		const results = await this.dataSource.list(filter.get(), paging.get(), sort.get(), textSearch);

		paging.setResponseHeaders(results.totalItems);

		return this.sendResponse(results.items);
	}

}

module.exports = ListApi;
