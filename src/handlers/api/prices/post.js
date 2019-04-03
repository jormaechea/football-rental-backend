'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const PricesDataSource = require('../../../data-sources/prices');

const pricesDataSource = new PricesDataSource(mongoConnectorPromise);

const postPriceMapper = requestData => ({
	name: requestData.name.trim(),
	value: Number(requestData.value)
});

app.post('/api/prices', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(pricesDataSource);

	postApi.setMapper(postPriceMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
