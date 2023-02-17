import './SingleMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';
import SingleMemoryCard from '../../components/SingleMemoryCard/SingleMemoryCard';

import { CreateMemoryContext } from '../../context/CreateMemoryContext';
import { useContext, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SingleMemory() {
	const [openModal, setOpenModal] = useState(false);
	const navigate = useNavigate();
	let { id } = useParams();

	const { logOut } = useContext(AuthContext);
	const { songMemoriesObject } = useContext(CreateMemoryContext);

	const memoryCard = songMemoriesObject[id];

	const memoryEdit = () => {
		navigate(`/users/EditMemory/${id}`);
	};

	const handleClick = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	const watchTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	const exitTrailer = () => {
		const currentState = openModal;
		setOpenModal(!currentState);
	};

	return (
		<div className="content-wrapper">
			<div className="App-content single-memory">
				<Header>
					<div className="headers-content">
						<div className="go-myPage-container">
							<p>
								<Link to="/users/MyPage">My Page</Link>
							</p>
						</div>
						<div className="logOut-container">
							<Button onClick={handleClick}>Log Out</Button>
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
								clickWatchTrailer={watchTrailer}
							/>
						)}
						<div className="button-container">
							<Button className="edit-button" onClick={memoryEdit}>
								Edit Memory
							</Button>
						</div>
					</div>
				</main>
				<Footer />
			</div>
			<div
				className={openModal ? 'show-video-modal' : 'disable-video-modal'}
				onClick={exitTrailer}
			>
				{memoryCard && (
					<iframe
						title="movieTrailer"
						src={memoryCard.song_url}
						frameBorder="0"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}

export default SingleMemory;
