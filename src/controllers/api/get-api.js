'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');
const NotFound = require('./errors/not-found');

class GetApi extends Api {

	async handleRequest() {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.getById)
			return new ApiInternalError('Invalid dataSource defined.');

		const result = await this.dataSource.getById(this.req.params.id);

		if(!result)
			return this.sendResponse(null, new NotFound('Resource not found'));

		return this.sendResponse(result);
	}

}

module.exports = GetApi;
