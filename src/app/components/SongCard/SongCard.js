import './SongCard.css';
import Button from '../Button/Button';

function SongCard({
	memoryDescription,
	keywords,
	image,
	title,
	memoryTitle,
	singleCardDelete,
	singleMemoryPreview,
}) {
	return (
		<div className="song-card">
			<div className="song-card-content">
				<div className="song-card-img-container">
					<img src={image} alt={title} className="img" />
				</div>
				<div className="song-card-text">
					<div className="song-memory-title">
						<p>{memoryTitle} </p>
					</div>
					<div className="song-memory">
						<p>{memoryDescription} </p>
					</div>
					<div className="song-keywords">
						<label>Keywords:</label>
						<p>{keywords}</p>
					</div>
					<div className="song-card-buttons">
						<Button onClick={singleCardDelete}>Delete</Button>
						<Button>Edit</Button>
						<Button onClick={singleMemoryPreview}>Review</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SongCard;
