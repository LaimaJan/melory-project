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
				message: 'No account with this email',
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

			res.status(200).json({ message: 'User found', user });
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
	// console.log('usersID:   ', user_id);

	const {
		song_url,
		memories_title,
		memories_description,
		image_url,
		memory_keywords,
	} = req.body;

	console.log('image_url: ', image_url);

	// const memories = await Song.find({
	// 	user_id: user_id,
	// });

	// console.log('memories: ', memories);

	try {
		// const oldSong = await Song.findOne({ song_url });

		// if (memories.song_url === oldSong) {
		// 	return res.status(409).json({
		// 		success: false,
		// 		message: 'You have already created a memory with this song...',
		// 	});
		// }

		const song = await Song.create({
			user_id: user_id,
			song_url,
			memories_title,
			memories_description,
			image_url,
			memory_keywords,
		});

		res.status(201).json({ message: 'Created a memory', song });
	} catch (err) {
		console.log(err);
	}
});

app.get('/users/MyPage', auth, async (req, res) => {
	const user = req.user;
	const { user_id } = user;

	try {
		const memories = await Song.find({
			user_id: user_id,
		});

		res.json(memories);
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
		// console.log(memoryToDelete);

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
