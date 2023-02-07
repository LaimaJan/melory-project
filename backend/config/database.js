const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = () => {
	mongoose.set('strictQuery', false);
	// Connecting to the database
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
			// useFindAndModify: false,
		})
		.then(() => {
			console.log('Connected to MongoDB with port:' + process.env.API_PORT);
		})
		.catch((error) => {
			console.log('database connection failed. exiting now...');
			console.error(error);
			process.exit(1);
		});
};
