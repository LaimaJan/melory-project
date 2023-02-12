import '../SingleMemory/SingleMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';
import SingleMemoryCard from '../../components/SingleMemoryCard/SingleMemory';

import { CreateMemoryContext } from '../../context/CreateMemoryContext';
import { useContext } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function EditMemory() {
	const navigate = useNavigate();
	let { id } = useParams();

	const { logOut } = useContext(AuthContext);
	const { songMemoriesObject } = useContext(CreateMemoryContext);

	const memoryCard = songMemoriesObject[id];

	const handleClick = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	return (
		<div className="App-content">
			<Header>
				<div className="headers-content">
					<div className="goBack-container">
						<p>
							<Link to="/users/MyPage">My Page</Link>
						</p>
					</div>
					<div className="logOut-container">
						<button className="logOut-btn btn" onClick={handleClick}>
							Log Out
						</button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder">
				<div className="main">
					{memoryCard && (
						<SingleMemoryCard
							key={memoryCard._id}
							image={memoryCard.image_url}
							title={memoryCard.memories_title}
							memoryTitle={memoryCard.memories_title}
							memoryDescription={memoryCard.memories_description}
							keywords={memoryCard.memory_keywords}
							video={memoryCard.song_url}
						/>
					)}
					<div className="button-container">
						<Button>Save</Button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default EditMemory;
