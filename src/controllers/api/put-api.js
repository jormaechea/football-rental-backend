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
			...requestData,
			[this.dataSource.constructor.idField]: id
		};
	}

	async handleRequest() {

		if(!this.dataSource)
			return new ApiInternalError('No dataSource defined.');

		if(!this.dataSource.insertUpdate)
			return new ApiInternalError('Invalid dataSource defined.');

		const insertUpdateData = this.executeMapper(this.req.params[this.dataSource.constructor.idField], this.req.body);

		const result = await this.dataSource.insertUpdate(insertUpdateData);

		if(!result)
			return this.sendResponse(null, new ApiInternalError('Internal error while saving resource'));

		return this.sendResponse();
	}

}

module.exports = PutApi;
