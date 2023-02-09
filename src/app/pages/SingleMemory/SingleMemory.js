import './SingleMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';
import SingleMemoryCard from '../../components/SingleMemoryCard/SingleMemory';

import { CreateMemoryContext } from '../../context/CreateMemoryContext';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SingleMemory() {
	const navigate = useNavigate();

	const { logOut } = useContext(AuthContext);
	const { songMemories } = useContext(CreateMemoryContext);

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
					{songMemories[0] && (
						<SingleMemoryCard
							key={songMemories[0]._id}
							image={songMemories[0].image_url}
							title={songMemories[0].memories_title}
							memoryTitle={songMemories[0].memories_title}
							memoryDescription={songMemories[0].memories_description}
							keywords={songMemories[0].memory_keywords}
							video={songMemories[0].song_url}
						/>
					)}
					<div className="button-container">
						<Button>Edit</Button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default SingleMemory;
