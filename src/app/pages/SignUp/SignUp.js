import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';

function SignUp() {
	const {
		signUpUser,
		handleInputChange,
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
	} = useContext(AuthContext);

	const navigate = useNavigate();

	const handleClick = async (e) => {
		let signedUp = await signUpUser(e);

		if (signedUp.success) {
			navigate('/users/signin');
		} else {
			alert(signedUp.error);
		}
	};

	return (
		<div className="App">
			<Header />

			<main className="main-content">
				<form className="form">
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
								onChange={(e) => handleInputChange(e)}
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
								onChange={(e) => handleInputChange(e)}
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
								onChange={(e) => handleInputChange(e)}
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
								onChange={(e) => handleInputChange(e)}
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
								onChange={(e) => handleInputChange(e)}
							/>
						</div>
					</div>
					<div className="submit-container">
						<Button type="submit" onClick={handleClick}>
							Register
						</Button>
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
