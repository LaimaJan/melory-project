import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './SignIn.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';

function SignIn() {
	const { loginUser, email, password, handleInputChange } =
		useContext(AuthContext);

	const navigate = useNavigate();

	const handleClick = async (e) => {
		let signedUp = await loginUser(e);

		if (signedUp.success) {
			navigate('/users/MyPage');
		} else {
			alert(signedUp.error);
		}
	};

	return (
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
					</div>
					<div className="submit-container">
						<Button type="submit" onClick={handleClick}>
							Sign In
						</Button>
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
	);
}

export default SignIn;
