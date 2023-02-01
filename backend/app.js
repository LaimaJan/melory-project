const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// const fs = require('fs');
// const path = require('path');

const User = require('./models/user.model.js');

// Middlewares
app.use(cors());
app.use(express.json());

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

mongoose.set('strictQuery', true);

// Connection to DB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB');

		app.listen(PORT, () => console.log('Server running on port:' + PORT));
	})
	.catch((e) => console.log(e));

// Routes
app.post('/users/signup', async (req, res) => {
	const newUserData = req.body;

	try {
		const doesUserExist = await User.findOne({ email: newUserData.email });

		if (!doesUserExist) {
			const newUser = new User(newUserData);

			const createdUser = await newUser.save();

			res.json({
				message: 'User created',
				user: createdUser,
			});
		} else {
			res.json({ message: 'User with given email already exists' });
		}
	} catch (error) {
		console.log(error);
	}
});

app.post('/users/login', async (req, res) => {
	const userData = req.body;

	try {
		const user = await User.findOne(userData);

		if (user) {
			res.json({ message: 'User found', user });
		} else {
			res.json({ message: 'User with given email and password not found' });
		}
	} catch (error) {
		console.log(error);
	}
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
