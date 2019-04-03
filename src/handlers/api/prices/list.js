'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const PricesFetcher = require('../../../data-sources/prices');

const pricesFetcher = new PricesFetcher(mongoConnectorPromise);

const availableFilters = [];

app.get('/api/prices', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(pricesFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
