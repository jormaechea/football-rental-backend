'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const CustomersFetcher = require('../../../data-sources/customers');

const customersFetcher = new CustomersFetcher(mongoConnectorPromise);

app.get('/api/customers/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(customersFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
