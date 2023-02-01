import { Link } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../../scripts/modules/constants';

import './SignIn.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function SignIn() {
	// const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
				await fetch(API_URL + '/users/login', {
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
				// navigate(``);
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
				<div className="App">
					<Header />

					<main className="main-content">
						<form className="form" onSubmit={loginUser}>
							<p className="paragraph">Sign In</p>
							<div className="form-body">
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
							</div>
							<div className="submit-container">
								<button type="submit" className="register btn">
									Sign In
								</button>
							</div>
							<div className="signIn-container">
								<p>Do not have an account?</p>
								<Link className="signIn-link" to="/users/signup">
									Register
								</Link>
							</div>
						</form>
					</main>

					<Footer />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default SignIn;
