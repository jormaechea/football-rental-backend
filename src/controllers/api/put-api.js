'use strict';

const Api = require('./api');
const ApiInternalError = require('./errors/internal-error');

class PutApi extends Api {

	executeMapper(id, requestData) {
		return this.mapper ? this.mapper(id, requestData) : this.defaultMapper(id, requestData);
	}

	setMapper(mapper) {
		this.mapper = mapper;
	}

	defaultMapper(id, requestData) {

		if(!this.dataSource)
			return requestData;

		return {
			...requestData
		};
	}

	async handleRequest() {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.insertUpdate)
			return new ApiInternalError('Invalid dataSource defined.');

		const insertUpdateData = this.executeMapper(this.req.params.id, this.req.body);

		const documentId = await this.dataSource.updateById(this.req.params.id, insertUpdateData);

		if(!documentId)
			return this.sendResponse(null, new ApiInternalError('Internal error while saving resource'));

		return this.sendResponse({ id: documentId });
	}

}

module.exports = PutApi;
