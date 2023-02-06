import { useState, createContext } from 'react';
import { API_URL } from '../../scripts/modules/constants';

const CreateMemoryContext = createContext();

const MemoryProvider = ({ children }) => {
	const handleSubmit = () => {
		console.log();
	};

	const createMemory = async (e) => {
		e.preventDefault();

		// if (user.password === '') alert('Please enter Password');
		// else if (user.confirmPassword === '')
		// 	alert('Please enter confirm password');
		// else if (user.password !== user.confirmPassword) {
		// 	console.log(user.password, user.confirmPassword);
		// 	alert('\nPassword did not match: Please try again...');
		// 	return false;
		// }

		try {
			const data = await (
				await fetch(API_URL + '/users/signup', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(),
				})
			).json();

			if (data.message === 'User created') {
				localStorage.setItem('user', data.user._id);
				console.log('USER CREATED');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<CreateMemoryContext.Provider
			value={{
				createMemory,
				handleSubmit,
			}}
		>
			{children}
		</CreateMemoryContext.Provider>
	);
};

export { CreateMemoryContext, MemoryProvider };
