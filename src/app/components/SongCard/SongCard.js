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
	singleMemoryEdit,
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
						<p>{keywords.join(', ')}</p>
					</div>
					<div className="song-card-buttons">
						<Button onClick={singleCardDelete} className="delete-btn button">
							Delete
						</Button>
						<Button onClick={singleMemoryEdit} className="edit-btn button">
							Edit
						</Button>
						<Button onClick={singleMemoryPreview} className="review-btn button">
							Review
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SongCard;
