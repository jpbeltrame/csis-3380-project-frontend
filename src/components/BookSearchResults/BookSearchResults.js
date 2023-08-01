import './BookSearchResults.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const BookSearchResults = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    // Reset the books state to an empty array whenever searchQuery changes
    setBooks([]);
    setStartIndex(0); // Reset startIndex to 0 for new search

    // Fetch initial 10 books when component is mounted
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/booksWithQuery`, {
        params: {
          query: searchQuery,
          limit: 10,
          offset: 0, // Start with 0 offset
        },
      })
      .then((response) => {
        setBooks(response.data.items);
        setTotalBooks(response.data.totalItems);
        setStartIndex(10); // Set startIndex to 10 as we already have the initial 10 books
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, [searchQuery]);

  const handleLoadMore = () => {
    // Load 10 more books
    const newStartIndex = startIndex + 10;

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/booksWithQuery`, {
        params: {
          query: searchQuery,
          limit: 10,
          offset: newStartIndex,
        },
      })
      .then((response) => {
        setBooks([...books, ...response.data.items]);
        setStartIndex(newStartIndex);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleBookClick = (bookId) => {
    // Use navigate to go to the BookDetail component with the bookId
    navigate(`/books/${bookId}`);
  };

  const renderBookCards = () => {
    return books.map((book) => (
      <Card key={book.id} className="book-card">
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail && (
          <img
            src={book.volumeInfo.imageLinks.smallThumbnail}
            alt={book.volumeInfo.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        )}
        <div style={{ padding: '10px' }}>
          <h3>{book.volumeInfo.title}</h3>
          {book.volumeInfo.authors && (
            <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
          )}
          {book.volumeInfo.publisher && (
            <p>Publisher: {book.volumeInfo.publisher}</p>
          )}
          {/* Pass the book.id from the API response to the handleBookClick function */}
          <Button onClick={() => handleBookClick(book.id)}>View Details</Button>
        </div>
      </Card>
    ));
  };

  return (
    <div className="book-cards-container">
      {renderBookCards()}
      {totalBooks > startIndex && <Button onClick={handleLoadMore}>Load More</Button>}
    </div>
  );
};

export default BookSearchResults;
