'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const UserDataSource = require('../../../data-sources/users');

const userDataSource = new UserDataSource(mongoConnectorPromise);

const putUserMapper = (id, requestData) => ({
	email: requestData.email.trim(),
	firstName: requestData.firstName.trim(),
	lastName: requestData.lastName.trim(),
	isActive: !!requestData.isActive
});

app.put('/api/users/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(userDataSource);

	putApi.setMapper(putUserMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
