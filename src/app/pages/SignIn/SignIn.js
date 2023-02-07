import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import './SignIn.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function SignIn() {
	const { loginUser, email, password, handleInputChange } =
		useContext(AuthContext);

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
						<button type="submit" className="register btn">
							{/* <Link to="/users/MyPage"> */}
							Sign In
							{/* </Link> */}
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
	);
}

export default SignIn;
