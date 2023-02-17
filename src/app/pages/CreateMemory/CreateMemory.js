import './CreateMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/Button/Button';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CreateMemoryContext } from '../../context/CreateMemoryContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function CreateMemory() {
	const navigate = useNavigate();
	const { createMemory, handleInputChange } = useContext(CreateMemoryContext);
	const { logOut } = useContext(AuthContext);

	const logginOut = () => {
		let letLogOut = logOut();

		if (letLogOut) {
			navigate('/');
		}
	};

	const handleClick = async (e) => {
		let memoryCreated = await createMemory(e);

		if (memoryCreated.success) {
			navigate('/users/MyPage');
		} else {
			alert(memoryCreated.error);
		}
	};

	return (
		<div className="App-content">
			<Header>
				<div className="headers-content">
					<div className="go-myPage-container">
						<p>
							<Link to="/users/MyPage">My Page</Link>
						</p>
					</div>
					<div className="logOut-container">
						<Button onClick={logginOut}>Log Out</Button>
					</div>
				</div>
			</Header>
			<main className="main-content-holder">
				<div className="main-content-middle">
					<form>
						<div className="memory-paragraph-container">
							<p>Create Memory</p>
						</div>
						<div className="create-memory-content">
							<div className="add-song-url">
								<label htmlFor="url">Add URL</label>
								<input
									type="url"
									id="song-url"
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-title">
								<label htmlFor="title">Add title</label>
								<input
									type="text"
									id="memory-title"
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-keywords">
								<label htmlFor="keywords">Memory keywords</label>
								<input
									type="text"
									id="memory-keywords"
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-description">
								<label htmlFor="description">Memory description</label>
								<textarea
									id="memory-description"
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
							<div className="add-memory-photos">
								<label htmlFor="photos">URL of image</label>
								<input
									type="text"
									id="memory-photo-url"
									onChange={(e) => handleInputChange(e)}
								/>
							</div>
						</div>
						<div className="submit-container">
							<Button type="submit" onClick={handleClick}>
								Create Memory
							</Button>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default CreateMemory;
