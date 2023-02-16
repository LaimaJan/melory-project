import React from 'react';
import Button from '../Button/Button';
import './Paginate.css';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
	const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

	const nextPage = () => {
		if (currentPage !== nPages) setCurrentPage(currentPage + 1);
	};
	const prevPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1);
	};
	return (
		<nav>
			<ul className="pagination">
				<li className="page-item">
					<Button onClick={prevPage}>Previous</Button>
				</li>
				{pageNumbers.map((pgNumber) => (
					<li
						key={pgNumber}
						className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}
					>
						<Button onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</Button>
					</li>
				))}
				<li className="page-item">
					<Button onClick={nextPage}>Next</Button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
