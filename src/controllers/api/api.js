'use strict';

class Api {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	setDataSource(dataSource) {
		this.dataSource = dataSource;
	}

	sendResponse(response, apiError) {

		if(apiError)
			return this.sendError(apiError);

		if(response)
			this.res.send(response);
		else
			this.res.end();
	}

	sendError(apiError) {

		if(!(apiError instanceof Error))
			apiError = new Error();

		if(apiError.message) {
			return this.res
				.status(apiError.statusCode)
				.send({
					message: apiError.message
				});
		}

		return this.res
			.status(apiError.statusCode)
			.end();
	}

}

module.exports = Api;
