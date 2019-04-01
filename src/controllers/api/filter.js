'use strict';

class Filter {

	constructor(req, availableFilters = []) {
		this.req = req;
		this.availableFilters = availableFilters.map(filter => {
			return typeof filter === 'object' ? filter : { name: filter };
		});
	}

	get() {

		return this.availableFilters.filter(filter => {
			return this.req.query[filter.name] !== undefined;
		}).reduce((acum, filter) => {

			const filterValue = filter.valueMapper ? filter.valueMapper(this.req.query[filter.name]) : this.req.query[filter.name];

			return {
				...acum,
				[filter.internalName || filter.name]: filterValue
			};
		}, {});
	}

}

module.exports = Filter;
