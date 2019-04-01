'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const UserDataSource = require('../../../data-sources/users');

const userDataSource = new UserDataSource(mongoConnectorPromise);

const postUserMapper = requestData => ({
	email: requestData.email.trim(),
	firstName: requestData.firstName.trim(),
	lastName: requestData.lastName.trim(),
	isActive: !!requestData.isActive
});

app.post('/api/users', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(userDataSource);

	postApi.setMapper(postUserMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
