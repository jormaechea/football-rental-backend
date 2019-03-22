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

const putUserMapper = (email, requestData) => ({
	email,
	firstName: requestData.firstName,
	lastName: requestData.lastName,
	isActive: requestData.isActive
});

app.put('/api/users/:email', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(userDataSource);

	putApi.setMapper(putUserMapper);

	return putApi.handleRequest()
		.catch(e => {

			console.log(e);

			return e;
		});
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
