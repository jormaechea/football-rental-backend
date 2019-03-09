'use strict';

const MongoConnector = require('../controllers/database/mongo-connector');

let dbHandler;
let mongoConnector;

module.exports = {

	mongoConnectorGetter: async function mongoConnectorGetter() {
		mongoConnector = new MongoConnector(
			process.env.MONGO_URL,
			process.env.MONGO_USER,
			process.env.MONGO_PASSWORD,
			process.env.MONGO_DB_NAME,
			process.env.MONGO_PORT,
			process.env.MONGO_SSL === 'true'
		);

		dbHandler = await mongoConnector.connect(dbHandler);

		return mongoConnector;
	}

};
