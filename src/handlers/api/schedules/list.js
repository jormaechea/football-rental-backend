'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const SchedulesFetcher = require('../../../data-sources/schedules');

const schedulesFetcher = new SchedulesFetcher(mongoConnectorPromise);

const availableFilters = [
	'dayOfWeek'
];

app.get('/api/schedules', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(schedulesFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
