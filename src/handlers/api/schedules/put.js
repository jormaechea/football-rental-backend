'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const SchedulesDataSource = require('../../../data-sources/schedules');

const schedulesDataSource = new SchedulesDataSource(mongoConnectorPromise);

const putScheduleMapper = (id, requestData) => ({
	dayOfWeek: Number(requestData.dayOfWeek),
	startingHour: requestData.startingHour.trim(),
	endingHour: requestData.endingHour.trim()
});

app.put('/api/schedules/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(schedulesDataSource);

	putApi.setMapper(putScheduleMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
