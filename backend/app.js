const express = require('express');

const cors = require('cors');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();
require('./config/database').connect();
const app = express();

const User = require('./models/user.model.js');
const Song = require('./models/song.model.js');

// Middlewares
app.use(cors());
app.use(express.json());

module.exports = app;

// Routes
app.post('/users/signup', async (req, res) => {
	// console.log('VEIKIA');
	const { name, surname, email, password } = req.body;
	console.log(req.body);

	try {
		console.log('name', name, 'surname', surname);

		if (!(email && password && name && surname)) {
			res.status(400).json({
				success: false,
				message: 'All input is required',
			});
		}

		const oldUser = await User.findOne({ email });

		if (oldUser) {
			return res.status(409).json({
				success: false,
				message: 'This email is alread in use',
			});
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
			success: true,
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
			res.status(400).json({
				success: false,
				message: 'All input is required',
			});
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(409).json({
				success: false,
				message: 'No account found with this email',
			});
		}

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

			res.status(200).json({ success: true, message: 'User found', user });
		} else {
			res.status(400).json({
				success: false,
				message: 'Invalid Credentials',
				token: user.token,
			});
		}
	} catch (err) {
		console.log(err);
	}
});

app.post('/users/CreateMemory', auth, async (req, res) => {
	const user = req.user;
	console.log('user: ', user);

	const { user_id } = user;

	const {
		song_url,
		memories_title,
		memories_description,
		image_url,
		memory_keywords,
	} = req.body;

	console.log('image_url: ', image_url);

	try {
		const song = await Song.create({
			user_id: user_id,
			song_url,
			memories_title,
			memories_description,
			image_url,
			memory_keywords,
		});

		res.status(201).json({ success: true, message: 'Created a memory', song });
	} catch (err) {
		console.log(err);
	}
});

app.get('/users/MyPage', auth, async (req, res) => {
	const user = req.user;
	const { user_id } = user;

	try {
		const filterWord = req.query.filter;
		if (typeof filterWord !== 'undefined') {
			const filteredCards = await Song.find({
				memory_keywords: filterWord,
			});

			res.json({ filteredCards, message: `Memories filtered` });
		} else {
			const memories = await Song.find({
				user_id: user_id,
			});

			res.json(memories);
		}
	} catch (error) {
		console.log(error);
	}
});

app.post('/users/delete', auth, async (req, res) => {
	const memoryId = req.body._id;

	const user = req.user;
	const { user_id } = user;

	try {
		const memoryToDelete = await Song.find({
			user_id: user_id,
			_id: memoryId,
		});

		if (memoryToDelete) {
			await Song.findByIdAndDelete(memoryId);

			res.json({ message: `Info about memory is deleted` });
		} else {
			res.status(400).json({
				success: false,
				message: 'Memory id and persons id do not match',
			});
		}
	} catch (error) {
		console.log(error);
	}
});

app.put('/users/EditMemory/:id', auth, async (req, res) => {
	const userId = req.params.id;
	console.log('id: ', userId);
	const newMemoryData = req.body;
	console.log('updatedMemoryData: ', newMemoryData);

	try {
		await Song.findByIdAndUpdate(userId, newMemoryData);
		const updatedMemory = await Song.findById(userId);
		res.json({ message: 'Memory updated', song: updatedMemory });
	} catch (error) {
		console.log(error);
	}
});
