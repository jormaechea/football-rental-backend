'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PutApi = require('../../../controllers/api/put-api');
const ReservationsDataSource = require('../../../data-sources/reservations');

const reservationsDataSource = new ReservationsDataSource(mongoConnectorPromise);

const putReservationMapper = (id, requestData) => ({
	user: requestData.user.trim(),
	customer: requestData.customer.trim(),
	field: requestData.field.trim(),
	schedule: requestData.schedule.trim(),
	price: requestData.price.trim(),
	amountPaid: requestData.amountPaid ? Number(requestData.amountPaid) : 0,
	confirmed: !!requestData.confirmed
});

app.put('/api/reservations/:id', (req, res) => {

	const putApi = new PutApi(req, res);
	putApi.setDataSource(reservationsDataSource);

	putApi.setMapper(putReservationMapper);

	return putApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
