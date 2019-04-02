'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const FieldDataSource = require('../../../data-sources/fields');

const fieldDataSource = new FieldDataSource(mongoConnectorPromise);

const putFieldMapper = (id, requestData) => ({
	name: requestData.name.trim(),
	size: Number(requestData.size)
});

app.put('/api/fields/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(fieldDataSource);

	putApi.setMapper(putFieldMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
