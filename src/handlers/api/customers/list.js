'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const CustomersFetcher = require('../../../data-sources/customers');

const customersFetcher = new CustomersFetcher(mongoConnectorPromise);

const availableFilters = [
	'ownerId',
	'documentNumber',
	'phone',
	'email',
	'firstName',
	'lastName',
	'isBlacklisted',
	'isPremium'
];

app.get('/api/customers', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(customersFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
