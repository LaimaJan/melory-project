import './RegistrationForm.css';

function Form() {
	return (
		<div className="form">
			<p className="paragraph">Registration</p>
			<div className="form-body">
				<div className="username">
					<label className="form__label" htmlFor="firstName">
						First Name
					</label>
					<input className="form__input" type="text" id="firstName" />
				</div>
				<div className="lastname">
					<label className="form__label" htmlFor="lastName">
						Last Name
					</label>
					<input type="text" name="" id="lastName" className="form__input" />
				</div>
				<div className="email">
					<label className="form__label" htmlFor="email">
						Email
					</label>
					<input type="email" id="email" className="form__input" />
				</div>
				<div className="password">
					<label className="form__label" htmlFor="password">
						Password
					</label>
					<input className="form__input" type="password" id="password" />
				</div>
				<div className="confirm-password">
					<label className="form__label" htmlFor="confirmPassword">
						Confirm Password
					</label>
					<input className="form__input" type="password" id="confirmPassword" />
				</div>
			</div>
			<div className="submit-container">
				<button type="submit" className="register btn">
					Register
				</button>
			</div>
			<div className="signIn-container">
				<p>Already have an account?</p>
				<p>Sign In</p>
			</div>
		</div>
	);
}

export default Form;
