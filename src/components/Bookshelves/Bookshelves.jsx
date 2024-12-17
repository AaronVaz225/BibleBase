import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Bookshelves.css';

// Mock data for now
const bookshelvesData = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Calvinism' },
    { id: 3, name: 'Arminianism' },
];

// Function to render a single bookshelf card
const renderBookshelfCard = (shelf, navigate) => {
    return (
        <div
            key={shelf.id}
            className="bookshelf-card"
            onClick={() => navigate(`/bookshelf/${shelf.id}`)}
        >
            <div className="bookshelf-icon">📚</div>
            <p>{shelf.name}</p>
        </div>
    );
};

// Main Component
const Bookshelves = () => {
    const navigate = useNavigate();

    return (
        <div className="bookshelves">
            <h1>BibleBase</h1>
            <div className="bookshelves-grid">
                {bookshelvesData.map((shelf) => renderBookshelfCard(shelf, navigate))}
            </div>
        </div>
    );
};

export default Bookshelves;
