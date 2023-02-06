import './CreateMemory.css';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

function CreateMemory() {
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
						<button className="logOut-btn btn">Log Out</button>
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
								<input type="url"></input>
							</div>
							<div className="add-memory-keywords">
								<label htmlFor="keywords">Memory keywords</label>
								<input type="text"></input>
							</div>
							<div className="add-memory-description">
								<label htmlFor="description">Memory description</label>
								<textarea></textarea>
							</div>
							<div className="add-memory-photos">
								<label htmlFor="photos">Photos</label>
								<input type="file"></input>
							</div>
						</div>
						<div className="submit-container">
							<button type="submit">
								<Link to="/users/MyPage">Create Memory</Link>
							</button>
						</div>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default CreateMemory;
