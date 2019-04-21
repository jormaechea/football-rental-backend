'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const ListApi = require('../../../controllers/api/list-api');
const ReservationsFetcher = require('../../../data-sources/reservations');

const reservationsFetcher = new ReservationsFetcher(mongoConnectorPromise);

const availableFilters = [
	'customer',
	'day',
	'schedule'
];

app.get('/api/reservations', (req, res) => {

	const listApi = new ListApi(req, res);
	listApi.setDataSource(reservationsFetcher);

	return listApi.handleRequest(availableFilters);
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
