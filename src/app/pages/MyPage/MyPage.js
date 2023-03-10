import './MyPage.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SongCard from '../../components/SongCard/SongCard';
import Pagination from '../../components/Paginate/Paginate';
import Button from '../../components/Button/Button';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CreateMemoryContext } from '../../context/CreateMemoryContext';

function MyPage() {
	const navigate = useNavigate();
	const { logOut } = useContext(AuthContext);
	const { getMemories, songMemoriesArray, deleteMemory, filterByKeywords } =
		useContext(CreateMemoryContext);

	const [currentPage, setCurrentPage] = useState(1);
	const [cardsPerPage] = useState(3);

	const indexOfLastRecord = currentPage * cardsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - cardsPerPage;
	let currentRecords = songMemoriesArray.slice(
		indexOfFirstRecord,
		indexOfLastRecord
	);
	const nPages = Math.ceil(songMemoriesArray.length / cardsPerPage);

	const clickFilterWordBtn = async (e) => {
		let filteredOutCards = await filterByKeywords(e);
		console.log(filteredOutCards);
	};

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

	const commaBetweenWords = (string) => {
		let fixedString = string;
		console.log(fixedString);
	};

	commaBetweenWords('summerteenagers');

	useEffect(() => {
		getMemories();
	}, []);

	return (
		<div className="App-content">
			<Header>
				<div className="headers-content">
					<div className="filter-input-container">
						<input
							id="filter-input"
							type="text"
							onChange={(e) => filterByKeywords(e)}
						/>
						<Button className="filter-btn" onClick={clickFilterWordBtn}>
							Filter
						</Button>
					</div>
					<div className="logOut-container">
						<Button className="btn" onClick={handleClick}>
							Log Out
						</Button>
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
							<Button className="addSong-btn">Add Song</Button>
						</Link>
					</div>
				</div>
				<div className="main-content-middle">
					{currentRecords.map(
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
				<Pagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</main>
			<Footer />
		</div>
	);
}

export default MyPage;
