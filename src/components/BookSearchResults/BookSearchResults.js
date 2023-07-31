import './BookSearchResults.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import { useLocation } from 'react-router-dom';

const BookSearchResults = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

  useEffect(() => {
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

  const renderBookCards = () => {
    return books.map((book) => (
        <Card key={book.id} className="book-card">
            <h3>{book.volumeInfo.title}</h3>
            <p>Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p>Publisher: {book.volumeInfo.publisher}</p>
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
