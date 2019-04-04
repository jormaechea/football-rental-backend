'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const SchedulesDataSource = require('../../../data-sources/schedules');

const schedulesDataSource = new SchedulesDataSource(mongoConnectorPromise);

const postScheduleMapper = requestData => ({
	dayOfWeek: Number(requestData.dayOfWeek),
	startingHour: requestData.startingHour.trim(),
	endingHour: requestData.endingHour.trim()
});

app.post('/api/schedules', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(schedulesDataSource);

	postApi.setMapper(postScheduleMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
