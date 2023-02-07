const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/database').connect();
const app = express();
// const PORT = process.env.API_PORT;

// const fs = require('fs');
// const path = require('path');

const User = require('./models/user.model.js');

// Middlewares
app.use(cors());
app.use(express.json());

module.exports = app;
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Set EJS as templating engine
// app.set('view engine', 'ejs');

// var multer = require('multer');

// var storage = multer.diskStorage({
// 	destination: (_req, _file, cb) => {
// 		cb(null, 'uploads');
// 	},
// 	filename: (_req, file, cb) => {
// 		cb(null, file.fieldname + '-' + Date.now());
// 	},
// });

// var upload = multer({ storage: storage });

// var imgModel = require('./models/user.model');

// Routes
app.post('/users/signup', async (req, res) => {
	// console.log('VEIKIA');
	const { name, surname, email, password } = req.body;
	console.log(req.body);

	try {
		console.log('name', name, 'surname', surname);

		if (!(email && password && name && surname)) {
			res.status(400).send('All input is required');
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).send('User Already Exist. Please Login');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			surname,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});

		// Create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: '2h',
			}
		);
		// save user token
		user.token = token;

		res.status(201).json({
			message: 'User created',
			user,
		});
	} catch (err) {
		console.log(err);
	}
});

app.post('/users/signin', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).send('All input is required');
		}

		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: '2h',
				}
			);

			// save user token
			user.token = token;

			res.status(200).json({ message: 'User founded', user });
		} else {
			res.status(400).send('Invalid Credentials');
		}
	} catch (err) {
		console.log(err);
	}
});

app.post('/users/MyPage', auth, (req, res) => {
	res.status(200).send('Welcome 🙌 ');
});

// app.get('/', (req, res) => {
// 	imgModel.find({}, (err, items) => {
// 		if (err) {
// 			console.log(err);
// 			res.status(500).send('An error occurred', err);
// 		} else {
// 			res.render('imagesPage', { items: items });
// 		}
// 	});
// });

// app.post('/users/signup', upload.single('image'), (req, res, next) => {
// 	var obj = {
// 		name: req.body.name,
// 		desc: req.body.desc,
// 		img: {
// 			data: fs.readFileSync(
// 				path.join(__dirname + '/uploads/' + req.file.filename)
// 			),
// 			contentType: 'image/png',
// 		},
// 	};

// 	imgModel.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			// item.save();
// 			res.redirect('/');
// 		}
// 	});
// });
