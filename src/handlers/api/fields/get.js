'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const FieldsFetcher = require('../../../data-sources/fields');

const fieldsFetcher = new FieldsFetcher(mongoConnectorPromise);

app.get('/api/fields/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(fieldsFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
