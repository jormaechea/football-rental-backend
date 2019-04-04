'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const CustomersDataSource = require('../../../data-sources/customers');

const customersDataSource = new CustomersDataSource(mongoConnectorPromise);

const postCustomerMapper = requestData => ({
	ownerId: requestData.ownerId.trim(),
	documentNumber: requestData.documentNumber.trim(),
	phone: requestData.phone.trim(),
	email: requestData.email.trim(),
	firstName: requestData.firstName.trim(),
	lastName: requestData.lastName.trim(),
	isBlacklisted: requestData.isBlacklisted !== undefined ? !!requestData.isBlacklisted : false,
	isPremium: requestData.isPremium !== undefined ? !!requestData.isPremium : false
});

app.post('/api/customers', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(customersDataSource);

	postApi.setMapper(postCustomerMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
