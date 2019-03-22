'use strict';

const SORT_PARAMETER = 'sort';

const DEFAULT_SORT_DIRECTION = 'asc';

class Sort {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	get() {
		const sortArray = this.req[SORT_PARAMETER] ? this.req[SORT_PARAMETER].split(',') : [];

		return sortArray.map(sortField => this.parseSortField(sortField));
	}

	parseSortField(sortField) {

		const sortParts = sortField.split(':');

		return {
			field: sortParts[0],
			direction: sortParts[1] || DEFAULT_SORT_DIRECTION
		};
	}

}

module.exports = Sort;
