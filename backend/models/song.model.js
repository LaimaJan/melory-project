const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
	user_id: {
		type: String,
		required: false,
	},
	song_url: {
		type: String,
		required: false,
	},
	memories_title: {
		type: String,
		required: false,
	},
	memories_description: {
		type: String,
		required: false,
	},
	image_url: {
		type: String,
		required: false,
	},
	memory_keywords: {
		type: Array,
		required: false,
	},
});

const Song = mongoose.model('song', songSchema);
module.exports = Song;
