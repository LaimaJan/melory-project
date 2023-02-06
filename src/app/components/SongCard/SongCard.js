import './SongCard.css';
import Button from '../Button/Button';

function SongCard({ memory, keywords, image, title }) {
	return (
		<div className="song-card">
			<div className="song-card-content">
				<div className="song-card-img-container">
					<img src={image} alt={title}></img>
				</div>
				<div className="song-card-text">
					<div className="song-memory">
						<p>{memory} </p>
					</div>
					<div className="song-keywords">
						<p>{keywords}</p>
					</div>
					<div className="song-card-buttons">
						<Button>Delete</Button>
						<Button>Edit</Button>
						<Button>Review</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SongCard;
