'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');

class PostApi extends Api {

	executeMapper(id, requestData) {
		return this.mapper ? this.mapper(id, requestData) : this.defaultMapper(id, requestData);
	}

	setMapper(mapper) {
		this.mapper = mapper;
	}

	defaultMapper(id, requestData) {
		return requestData;
	}

	async handleRequest() {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.insertUpdate)
			return new ApiInternalError('Invalid dataSource defined.');

		const insertData = this.executeMapper(this.req.body);

		const documentId = await this.dataSource.insertUpdate(insertData);

		if(!documentId)
			return this.sendResponse(null, new ApiInternalError('Internal error while saving resource'));

		return this.sendResponse({ id: documentId });
	}

}

module.exports = PostApi;
