'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const FieldsDataSource = require('../../../data-sources/fields');

const fieldsDataSource = new FieldsDataSource(mongoConnectorPromise);

const postFieldMapper = requestData => ({
	name: requestData.name.trim(),
	size: Number(requestData.size)
});

app.post('/api/fields', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(fieldsDataSource);

	postApi.setMapper(postFieldMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
