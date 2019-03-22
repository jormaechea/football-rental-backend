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

app.get('/api/users/:email', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setFetcher(userFetcher);

	return getApi.handleRequest()
		.catch(e => {

			console.log(e);

			return e;
		});
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
