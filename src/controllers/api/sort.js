'use strict';

const SORT_PARAMETER = '_sort';
const SORT_DIRECTION_PARAMETER = '_order';

const DEFAULT_SORT_DIRECTION = 'asc';

class Sort {

	constructor(req) {
		this.req = req;
	}

	get() {

		if(!this.req.query[SORT_PARAMETER])
			return;

		return {
			field: this.req.query[SORT_PARAMETER],
			direction: (this.req.query[SORT_DIRECTION_PARAMETER] || DEFAULT_SORT_DIRECTION).toLowerCase()
		};
	}

}

module.exports = Sort;
