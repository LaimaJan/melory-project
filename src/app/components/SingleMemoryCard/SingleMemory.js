import './SingleMemory.css';
// import Button from '../Button/Button';

function SingleMemoryCard({
	video,
	memoryDescription,
	keywords,
	image,
	title,
	memoryTitle,
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
				<div className="keywords-container">
					<p className="keywords-label">Keywords:</p>
					<p className="keywords">{keywords}</p>
				</div>
				<div className="video-container">
					<iframe
						className="video"
						title="movieTrailer"
						src={video}
						frameBorder="0"
						allowFullScreen
					/>
				</div>
			</div>
		</div>
	);
}

export default SingleMemoryCard;
