'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const UserFetcher = require('../../../data-sources/users');

const userFetcher = new UserFetcher(mongoConnectorPromise);

app.get('/api/users/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(userFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
