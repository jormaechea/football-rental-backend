'use strict';

class Api {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	sendResponse(response, apiError) {

		if(apiError)
			return this.sendError(apiError);

		// this.res.status(200);

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
