'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const PricesDataSource = require('../../../data-sources/prices');

const pricesDataSource = new PricesDataSource(mongoConnectorPromise);

const putPriceMapper = (id, requestData) => ({
	name: requestData.name.trim(),
	value: Number(requestData.value)
});

app.put('/api/prices/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(pricesDataSource);

	putApi.setMapper(putPriceMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
