'use strict';

class Filter {

	constructor(req, res, availableFilters = []) {
		this.req = req;
		this.res = res;
		this.availableFilters = availableFilters.map(filter => {
			return typeof filter === 'object' ? filter : { name: filter };
		});
	}

	get() {

		return this.availableFilters.filter(filter => {
			return this.req.query[filter.name] !== undefined;
		}).reduce((acum, filter) => {
			return {
				...acum,
				[filter.internalName || filter.name]: this.req.query[filter.name]
			};
		}, {});
	}

}

module.exports = Filter;
