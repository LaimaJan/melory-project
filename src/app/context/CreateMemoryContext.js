import { useState, createContext } from 'react';

import { API_URL } from '../../scripts/modules/constants';

const CreateMemoryContext = createContext();

const MemoryProvider = ({ children }) => {
	const [songUrl, setSongUrl] = useState('');
	const [title, setTitle] = useState('');
	const [keywords, setKeywords] = useState('');
	const [description, setDescription] = useState('');
	const [photoUrl, setPhotoUrl] = useState('');
	const [songMemoriesObject, setSongMemoriesObject] = useState([]);
	const [songMemoriesArray, setSongMemoriesArray] = useState([]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === 'song-url') {
			setSongUrl(value);
		}
		if (id === 'memory-title') {
			setTitle(value);
		}
		if (id === 'memory-keywords') {
			setKeywords(value);
		}
		if (id === 'memory-description') {
			setDescription(value);
		}
		if (id === 'memory-photo-url') {
			setPhotoUrl(value);
		}

		console.log('photoUrl: ', photoUrl);
	};

	const createMemory = async (e) => {
		e.preventDefault();

		const songUrlEmbed = songUrl.replace('watch?v=', 'embed/');
		console.log('songUrl: ', songUrl);
		const enableYoutubeVideo = '?enablejsapi=1';
		const result = [songUrlEmbed, enableYoutubeVideo].join('');
		console.log('result', result);

		const songMemory = {
			song_url: result,
			memories_title: title,
			memory_keywords: keywords,
			memories_description: description,
			image_url: photoUrl,
		};

		let response = {
			success: true,
			error: null,
		};

		if (songMemory.url === '') {
			response.success = false;
			response.error = 'Please enter song url';
		}

		const token = localStorage.getItem('token');
		// console.log('tokenas: ', token);

		console.log('songUrlEmbed', songUrlEmbed);

		if (response.error === null) {
			try {
				const data = await (
					await fetch(API_URL + '/users/CreateMemory', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json',
							'x-access-token': token,
						},
						body: JSON.stringify(songMemory),
					})
				).json();

				// if (data.message === 'Token is invalid, please recheck') {
				// 	response.success = false;
				// 	response.error = 'Token is invalid';
				// } else
				if (data.message === 'Created a memory') {
					response.success = true;
					response.error = 'Memory with picked song was created';
				}
			} catch (error) {
				console.log(error);
			}
		}

		return response;
	};

	const getMemories = async () => {
		const token = localStorage.getItem('token');

		try {
			const result = await fetch(API_URL + '/users/MyPage', {
				method: 'GET',
				headers: {
					'x-access-token': token,
				},
			});

			if (result.status >= 400 && result.status <= 599) {
				throw new Error('failed to load');
			} else {
				let json = await result.json();

				setSongMemoriesArray(json);

				const arrayConversionToObject = (array, key) => {
					const initialValue = {};
					return array.reduce((obj, item) => {
						return {
							...obj,
							[item[key]]: item,
						};
					}, initialValue);
				};

				const newJson = arrayConversionToObject(json, '_id');
				console.log('newJson: ', newJson);

				setSongMemoriesObject(newJson);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteMemory = async (id) => {
		console.log('deleteMemoryId: ', id);

		const token = localStorage.getItem('token');

		let response = {
			success: true,
			error: null,
		};

		try {
			const data = await (
				await fetch(API_URL + '/users/delete', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						'x-access-token': token,
					},
					body: JSON.stringify({
						_id: id,
					}),
				})
			).json();

			if (data.message === 'Info about memory is deleted') {
				response.success = true;
				// response.error = 'Info about memory is deleted';
			}

			window.location.reload();
		} catch (error) {
			console.log(error);
		}

		return response;
	};

	return (
		<CreateMemoryContext.Provider
			value={{
				createMemory,
				handleInputChange,
				getMemories,
				songMemoriesObject,
				deleteMemory,
				songMemoriesArray,
			}}
		>
			{children}
		</CreateMemoryContext.Provider>
	);
};

export { CreateMemoryContext, MemoryProvider };
