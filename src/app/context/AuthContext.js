import { useState, createContext } from 'react';
import { API_URL } from '../../scripts/modules/constants';

const AuthContext = createContext();

const FormProvider = ({ children }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [token, setToken] = useState(
		window.localStorage.getItem('token' || [])
	);

	const updateToken = (token) => {
		window.localStorage.setItem('token', token);
		setToken(token);
	};

	const user = {
		name: firstName,
		surname: lastName,
		email: email,
		password: password,
		confirmPassword: confirmPassword,
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;

		switch (id) {
			case 'firstName':
				setFirstName(value);
				break;
			case 'lastName':
				setLastName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			default:
				console.log('Empty action received at the form.');
		}
	};

	const signUpUser = async (e) => {
		e.preventDefault();

		let response = {
			success: true,
			error: null,
		};

		if (user.password === '') {
			response.success = false;
			response.error = 'Please enter password';
		} else if (user.confirmPassword === '') {
			response.success = false;
			response.error = 'Please enter confirm password';
		} else if (user.password !== user.confirmPassword) {
			response.success = false;
			response.error = '\nPassword did not match: Please try again...';
		}

		if (response.error === null) {
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
					response.success = true;
					response.error = 'User is created';
				} else if (data.message === 'This email is alread in use') {
					response.success = false;
					response.error = 'This email is already in use';
				}
			} catch (error) {
				console.log(error);
			}
		}

		return response;
	};

	const loginUser = async (e) => {
		e.preventDefault();

		let response = {
			success: true,
			error: null,
		};

		const user = {
			email: email,
			password: password,
		};

		if (!user.email || !user.password) {
			response.success = false;
			response.error = 'Please provide needed information';
		}

		if (response.error === null) {
			try {
				const data = await (
					await fetch(API_URL + '/users/signin', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json',
						},
						body: JSON.stringify(user),
					})
				).json();

				if (data.success) {
					updateToken(data.user.token);

					localStorage.setItem('user', data.user._id);
					localStorage.setItem('token', data.user.token);

					response.success = true;
				} else {
					response.success = false;
					response.error = data.message;
				}
			} catch (error) {
				console.log(error);
			}
		}

		return response;
	};

	const logOut = () => {
		console.log('logOut triggered');

		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setToken(null);

		return true;
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				updateToken,
				signUpUser,
				handleInputChange,
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				loginUser,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, FormProvider };
