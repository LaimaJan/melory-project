import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './SignUp.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { API_URL } from '../../../scripts/modules/constants';

function SignUp() {
	const navigate = useNavigate();

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

	console.log('USER TRYING TO REGISTER', user);

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
				navigate(`/users/signin`);
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<Header />

			<main className="main-content">
				<form className="form" onSubmit={signUpUser}>
					<p className="paragraph">Registration</p>
					<div className="form-body">
						<div className="username">
							<label className="form__label" htmlFor="firstName">
								First Name
							</label>
							<input
								className="form__input"
								type="text"
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="lastname">
							<label className="form__label" htmlFor="lastName">
								Last Name
							</label>
							<input
								type="text"
								name=""
								id="lastName"
								className="form__input"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div className="email">
							<label className="form__label" htmlFor="email">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="form__input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="password">
							<label className="form__label" htmlFor="password">
								Password
							</label>
							<input
								className="form__input"
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="confirm-password">
							<label className="form__label" htmlFor="confirmPassword">
								Confirm Password
							</label>
							<input
								className="form__input"
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="submit-container">
						<button
							type="submit"
							className="register btn"
							// onClick={() => handleSubmit()}
						>
							Register
						</button>
					</div>
					<div className="signIn-container">
						<p>Already have an account?</p>
						<Link className="signIn-link" to="/users/signin">
							Sign In
						</Link>
					</div>
				</form>
			</main>

			<Footer />
		</div>
	);
}

export default SignUp;
