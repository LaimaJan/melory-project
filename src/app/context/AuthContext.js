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

	const handleSubmit = () => {
		console.log(firstName, lastName, email, password, confirmPassword);
	};

	const signUpUser = async (e) => {
		e.preventDefault();

		if (user.password === '') alert('Please enter Password');
		else if (user.confirmPassword === '')
			alert('Please enter confirm password');
		else if (user.password !== user.confirmPassword) {
			console.log(user.password, user.confirmPassword);
			alert('\nPassword did not match: Please try again...');
			return false;
		}

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
				console.log('USER CREATED');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const loginUser = async (e) => {
		e.preventDefault();

		const user = {
			email: email,
			password: password,
		};

		if (!user.email || !user.password) {
			alert('Please provide needed information');
			return;
		}

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
				console.log('USER FOUND');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// const logOut = () => {
	// 	console.log('logOut triggered');

	// };

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
				handleSubmit,
				loginUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, FormProvider };
