const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
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
	// images: {
	// 	data: Buffer,
	// 	contentType: String,
	// 	required: false,
	// },
	// memory_keywords: {
	// 	type: [String],
	// 	required: false,
	// },
});

const Song = mongoose.model('song', songSchema);
module.exports = Song;
