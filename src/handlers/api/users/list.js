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
	'email',
	{
		name: 'isActive',
		valueMapper: value => value === 'true' || value === true
	}
];

app.get('/api/users', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(userFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
