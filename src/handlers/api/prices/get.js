'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const PricesFetcher = require('../../../data-sources/prices');

const pricesFetcher = new PricesFetcher(mongoConnectorPromise);

app.get('/api/prices/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(pricesFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
