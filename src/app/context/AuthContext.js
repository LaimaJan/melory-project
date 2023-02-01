import { useState, createContext } from 'react';

import { API_URL } from '../../scripts/modules/constants';

const AuthContext = createContext();

const FormProvider = ({ children }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const user = {
		name: firstName,
		surname: lastName,
		email: email,
		password: password,
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id === 'firstName') {
			setFirstName(value);
		}
		if (id === 'lastName') {
			setLastName(value);
		}
		if (id === 'email') {
			setEmail(value);
		}
		if (id === 'password') {
			setPassword(value);
		}
		if (id === 'confirmPassword') {
			setConfirmPassword(value);
		}
	};

	const signUpUser = async (e) => {
		e.preventDefault();

		try {
			const data = await (
				await fetch(API_URL + '/users/signup', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(user),
				})
			).json();

			if (data.message === 'User created') {
				localStorage.setItem('user', data.user._id);
				console.log('USERIS SUKURTAS');
				// location.href =
				// 	'http://127.0.0.1:5500/nodejs_13_16_paskaita/frontend/pages/my-account.html';
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				signUpUser,
				handleInputChange,
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, FormProvider };
