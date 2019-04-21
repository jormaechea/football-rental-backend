'use strict';

const {
	app,
	server,
	mongoConnectorPromise,
	awsServerlessExpress
} = require('../server');

const PostApi = require('../../../controllers/api/post-api');
const ReservationsDataSource = require('../../../data-sources/reservations');

const reservationsDataSource = new ReservationsDataSource(mongoConnectorPromise);

const postReservationMapper = requestData => ({
	user: requestData.user.trim(),
	customer: requestData.customer.trim(),
	field: requestData.field.trim(),
	schedule: requestData.schedule.trim(),
	price: requestData.price.trim(),
	amountPaid: requestData.amountPaid ? Number(requestData.amountPaid) : 0,
	confirmed: !!requestData.confirmed
});

app.post('/api/reservations', (req, res) => {

	const postApi = new PostApi(req, res);
	postApi.setDataSource(reservationsDataSource);

	postApi.setMapper(postReservationMapper);

	return postApi.handleRequest();
});


exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);
