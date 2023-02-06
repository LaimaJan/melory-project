import './MyPage.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
// import Button from '../../components/Button/Button';
import SongCard from '../../components/SongCard/SongCard';
import { FaSearch } from 'react-icons/fa';

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
						<button className="addSong-btn btn">Add Song</button>
					</div>
				</div>
				<div className="main-content-middle">
					<SongCard></SongCard>
					{/* <div className="song-card">
						<div className="song-card-content">
							<div className="song-card-img-container">
								<img className="song-image" alt="some img" />
							</div>
							<div className="song-card-text">
								<div className="song-memory">
									<p>SUMMER OF </p>
								</div>
								<div className="song-keywords">
									<p>#summer</p>
								</div>
								<div className="song-card-buttons">
									<Button>Delete</Button>
									<Button>Edit</Button>
									<Button>Review</Button>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default MyPage;
