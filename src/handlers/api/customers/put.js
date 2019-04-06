'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const CustomersDataSource = require('../../../data-sources/customers');

const customersDataSource = new CustomersDataSource(mongoConnectorPromise);

const putCustomerMapper = (id, requestData) => ({
	ownerId: requestData.ownerId.trim(),
	documentNumber: requestData.documentNumber ? requestData.documentNumber.trim() : '',
	phone: requestData.phone ? requestData.phone.trim() : '',
	email: requestData.email ? requestData.email.trim() : '',
	firstName: requestData.firstName ? requestData.firstName.trim() : '',
	lastName: requestData.lastName ? requestData.lastName.trim() : '',
	isBlacklisted: requestData.isBlacklisted !== undefined ? !!requestData.isBlacklisted : false,
	isPremium: requestData.isPremium !== undefined ? !!requestData.isPremium : false
});

app.put('/api/customers/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(customersDataSource);

	putApi.setMapper(putCustomerMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
