'use strict';

const START_PARAMETER = '_start';

const END_PARAMETER = '_end';

const DEFAULT_START = 0;

const DEFAULT_END = 20;

const RESPONSE_PAGING_HEADER = 'x-total-count';

class Paging {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	get() {
		return {
			start: this.start,
			end: this.end
		};
	}

	get start() {
		return this.req.query[START_PARAMETER] || DEFAULT_START;
	}

	get end() {
		return this.req.query[END_PARAMETER] || DEFAULT_END;
	}

	setResponseHeaders(resultsCount) {
		this.res.header({
			[RESPONSE_PAGING_HEADER]: resultsCount,
			'Access-Control-Expose-Headers': RESPONSE_PAGING_HEADER
		});
	}

}

module.exports = Paging;
