'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const GetApi = require('../../../controllers/api/get-api');
const ReservationsFetcher = require('../../../data-sources/reservations');

const reservationsFetcher = new ReservationsFetcher(mongoConnectorPromise);

app.get('/api/reservations/:id', (req, res) => {

	const getApi = new GetApi(req, res);
	getApi.setDataSource(reservationsFetcher);

	return getApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
