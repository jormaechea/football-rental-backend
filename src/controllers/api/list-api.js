'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');
const Filter = require('./filter');
const Paging = require('./paging');
const Sort = require('./sort');

class ListApi extends Api {

	async handleRequest(availableFilters) {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.list)
			return new ApiInternalError('Invalid dataSource defined.');

		const filter = new Filter(this.req, availableFilters);
		const paging = new Paging(this.req, this.res);
		const sort = new Sort(this.req);

		const results = await this.dataSource.list(filter.get(), paging.get(), sort.get());

		paging.setResponseHeaders(results.length);

		return this.sendResponse(results);
	}

}

module.exports = ListApi;
