import './SingleMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function SingleMemory() {
	return (
		<div className="App-content">
			<Header>
				<div className="headers-content">
					<div className="logOut-container">
						<button className="logOut-btn btn">Log Out</button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder"></main>
			<Footer />
		</div>
	);
}

export default SingleMemory;
