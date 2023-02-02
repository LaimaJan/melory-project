import './MyPage.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { FaSearch } from 'react-icons/fa';

function MyPage() {
	return (
		<div className="App">
			<Header>
				<div className="headers-content">
					<div className="filter-input-container">
						<input className="filter-input" type="text" />
						<button className="submitBtn">
							<FaSearch />
						</button>
					</div>
					<div className="logOut-container">
						<button className="logOut-btn btn">Log Out</button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder">
				<div className="main-content-middle">
					<div className="mySongs-container">
						<p className="mySongs-paragraph">My Songs</p>
					</div>

					<div className="addSong-container">
						<button className="addSong-btn btn">Add Song</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default MyPage;
