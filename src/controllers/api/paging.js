'use strict';

const PAGE_PARAMETER = 'page';

const PAGE_SIZE_PARAMETER = 'per_page';

const DEFAULT_PAGE = 1;

const DEFAULT_PAGE_SIZE = 20;

const RESPONSE_PAGING_HEADER = 'resources';

class Paging {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	get() {
		return {
			page: this.page,
			pageSize: this.pageSize
		};
	}

	get page() {
		return this.req.query[PAGE_PARAMETER] || DEFAULT_PAGE;
	}

	get pageSize() {
		return this.req.query[PAGE_SIZE_PARAMETER] || DEFAULT_PAGE_SIZE;
	}

	setResponseHeaders(resultsCount) {

		const offset = (this.page - 1) * this.pageSize;
		const pageEnd = offset + this.pageSize;

		this.res.header(RESPONSE_PAGING_HEADER, `${offset}-${pageEnd}/${resultsCount}`);
	}

}

module.exports = Paging;
