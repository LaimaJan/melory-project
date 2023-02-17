import './SingleMemory.css';
import Button from '../Button/Button';

function SingleMemoryCard({
	memoryDescription,
	keywords,
	image,
	title,
	memoryTitle,
	clickWatchTrailer,
}) {
	return (
		<div className="memory-card-holder">
			<div className="memory-card">
				<div className="memory-card-top">
					<div className="img-container">
						<img src={image} alt={title} />
					</div>
					<div className="title-description-container">
						<p className="title">{memoryTitle}</p>
						<p className="description">{memoryDescription}</p>
					</div>
				</div>
				<div className="keywords-video-container">
					<div className="keywords-container">
						<p className="keywords-label">Keywords:</p>
						<p className="keywords">{keywords.join(', ')}</p>
					</div>
					<Button className="video-button" onClick={clickWatchTrailer}>
						Listen to Song
					</Button>
				</div>
			</div>
		</div>
	);
}

export default SingleMemoryCard;
