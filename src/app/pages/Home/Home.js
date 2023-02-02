import './Home.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className="App">
			<Header />
			<main className="main-content">
				<div className="card">
					<p className="card-paragraph">Welcome to Melory</p>
					<div className="card-content">
						<div className="signIn-content">
							<p className="title">Have an account?</p>
							<Link className="link" to="/users/signin">
								Sign In
							</Link>
						</div>
						<div className="signUp-content">
							<p className="title">Want to create an account?</p>
							<Link className="link" to="/users/signup">
								Sign Up
							</Link>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Home;
