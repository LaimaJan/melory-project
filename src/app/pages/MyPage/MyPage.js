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

	// let page = 1;
	// let itemsPerPage = 10;

	const { getMemories, songMemoriesArray, deleteMemory } =
		useContext(CreateMemoryContext);

	const handleClick = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	const singleMemoryClicked = (id) => {
		console.log('Pries function: ' + id);

		navigate(`/users/SingleMemory/${id}`);
	};

	const memoryEdit = (id) => {
		console.log('Pries function: ' + id);

		navigate(`/users/EditMemory/${id}`);
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
					{songMemoriesArray.map(
						({
							_id,
							memories_title,
							memories_description,
							image_url,
							memory_keywords,
						}) => (
							<SongCard
								key={_id}
								image={image_url}
								title={memories_title}
								memoryTitle={memories_title}
								memoryDescription={memories_description}
								keywords={memory_keywords}
								singleCardDelete={() => deleteMemory(_id)}
								singleMemoryPreview={() => singleMemoryClicked(_id)}
								singleMemoryEdit={() => memoryEdit(_id)}
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
