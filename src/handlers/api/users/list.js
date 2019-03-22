'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const UserFetcher = require('../../../data-sources/users');

const userFetcher = new UserFetcher(mongoConnectorPromise);

const availableFilters = [
	'email'
];

app.get('/api/users', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(userFetcher);

	return listApi.handleRequest(availableFilters)
		.catch(e => {

			console.log(e);

			return e;
		});
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
