'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const FieldsFetcher = require('../../../data-sources/fields');

const fieldsFetcher = new FieldsFetcher(mongoConnectorPromise);

const availableFilters = [
	'name',
	'size'
];

app.get('/api/fields', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(fieldsFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
