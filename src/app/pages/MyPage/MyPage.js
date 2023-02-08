import './MyPage.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SongCard from '../../components/SongCard/SongCard';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CreateMemoryContext } from '../../context/CreateMemoryContext';

function MyPage() {
	const navigate = useNavigate();
	const { logOut } = useContext(AuthContext);
	const { getMemories, songMemories } = useContext(CreateMemoryContext);

	const handleClick = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	const singleCardClicked = (id) => {
		console.log('Paklikintas buttonas, dainos korteles id ' + id);
	};

	useEffect(() => {
		getMemories();
	}, []);

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
						<button className="logOut-btn btn" onClick={handleClick}>
							Log Out
						</button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder">
				<div className="main-content-top">
					<div className="mySongs-container">
						<p className="mySongs-paragraph">My Songs</p>
					</div>
					<div className="addSong-container">
						<Link to="/users/CreateMemory">
							<button className="addSong-btn btn">Add Song</button>
						</Link>
					</div>
				</div>
				<div className="main-content-middle">
					{songMemories.map(
						({
							// song_url,
							_id,
							memories_title,
							memories_description,
							memory_keywords,
						}) => (
							<SongCard
								key={_id}
								// image={song_url}
								title={memories_title}
								memoryTitle={memories_title}
								memoryDescription={memories_description}
								keywords={memory_keywords}
								singleCard={() => singleCardClicked(_id)}
							/>
						)
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default MyPage;
