import './MyPage.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SongCard from '../../components/SongCard/SongCard';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function MyPage() {
	return (
		<div className="App-content">
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
				<div className="main-content-top">
					<div className="mySongs-container">
						<p className="mySongs-paragraph">My Songs</p>
					</div>
					<div className="addSong-container">
						<button className="addSong-btn btn">
							<Link to="/users/CreateMemory">Add Song</Link>
						</button>
					</div>
				</div>
				<div className="main-content-middle">
					<SongCard></SongCard>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default MyPage;
