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
		confirmPassword: confirmPassword,
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

				if (data.message === 'User found') {
					localStorage.setItem('user', data.user._id);
					localStorage.setItem('token', data.user.token);

					response.success = true;
					response.error = 'User found';
				} else if (data.message === 'No account with this email') {
					response.success = false;
					response.error =
						'\nNo account is registered with this email, please register...';
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

		return true;
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
				loginUser,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, FormProvider };
