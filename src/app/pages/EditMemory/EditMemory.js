import '../CreateMemory/CreateMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
// import Button from '../../components/Button/Button';
// import SingleMemoryCard from '../../components/SingleMemoryCard/SingleMemory';

import { CreateMemoryContext } from '../../context/CreateMemoryContext';
import { useContext } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function EditMemory() {
	const navigate = useNavigate();
	let { id } = useParams();

	const { logOut } = useContext(AuthContext);
	const { songMemoriesObject, handleInputChange, updateMemories } =
		useContext(CreateMemoryContext);

	const memoryCard = songMemoriesObject[id];

	const loggingOut = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	const handleClick = async (e) => {
		let memoryUpdated = await updateMemories(e, id);

		if (memoryUpdated.success) {
			navigate('/users/MyPage');
		} else {
			alert(memoryUpdated.error);
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
						<button className="logOut-btn btn" onClick={loggingOut}>
							Log Out
						</button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder">
				<div className="main-content-middle">
					<form key={memoryCard._id}>
						<div className="memory-paragraph-container">
							<p>Edit Memory</p>
						</div>
						<div className="create-memory-content">
							<div className="add-song-url">
								<label htmlFor="url">Add URL</label>
								<input
									type="url"
									id="song-url"
									defaultValue={memoryCard.song_url}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-title">
								<label htmlFor="title">Add title</label>
								<input
									type="text"
									id="memory-title"
									defaultValue={memoryCard.memories_title}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-keywords">
								<label htmlFor="keywords">Memory keywords</label>
								<input
									type="text"
									id="memory-keywords"
									defaultValue={memoryCard.memory_keywords}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-description">
								<label htmlFor="description">Memory description</label>
								<textarea
									id="memory-description"
									defaultValue={memoryCard.memories_description}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-photos">
								<label htmlFor="photos">URL of image</label>
								<input
									type="text"
									id="memory-photo-url"
									defaultValue={memoryCard.image_url}
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
						</div>
						<div className="submit-container">
							<button type="submit" onClick={handleClick}>
								Save edited memory
							</button>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default EditMemory;
