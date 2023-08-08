import './BookSearchResults.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Spin } from 'antd';

import BookCard from '../../components/BookCard/BookCard';

const BookSearchResults = () => {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state variable
  const location = useLocation();
  const searchQuery = location.state?.searchQuery;

  useEffect(() => {
    setBooks([]);
    setStartIndex(0);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/booksWithQuery`, {
        params: {
          query: searchQuery,
          limit: 10,
          offset: 0,
        },
      })
      .then((response) => {
        setBooks(response.data.items);
        setTotalBooks(response.data.totalItems);
        setStartIndex(10);
        setIsLoading(false); // Set loading to false after API call is complete
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setIsLoading(false); // Set loading to false on error as well
      });
  }, [searchQuery]);

  const handleLoadMore = () => {
    setIsLoading(true); // Set loading to true before making the API call

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
        setIsLoading(false); // Set loading to false after API call is complete
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setIsLoading(false); // Set loading to false on error as well
      });
  };

  const renderBookCards = () => {
    return books.map((book) => (
      <BookCard book={book} key={book.id} />
    ));
  };

  return (
    <div>
      {/* Show loading component while API call is in progress */}
      {isLoading ? (
        <Spin size="large" style={{ display: 'block', margin: 'auto' }} />
      ) : (
        <div>
          <div className="book-cards-container">
            {renderBookCards()}
          </div>
          {totalBooks > startIndex && <Button className='load-more' onClick={handleLoadMore}>Load More</Button>}
        </div>
      )}
    </div>
  );
};

export default BookSearchResults;
