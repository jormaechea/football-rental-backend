'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const SchedulesFetcher = require('../../../data-sources/schedules');

const schedulesFetcher = new SchedulesFetcher(mongoConnectorPromise);

app.get('/api/schedules/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(schedulesFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
