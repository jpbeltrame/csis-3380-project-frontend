import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { useUserContext } from '../../UserContext';
import './WishList.css'; // Import the CSS file here
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Meta } = Card;

const WishList = () => {
  const { userId, username } = useUserContext();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/wishlist/${userId}`)
      .then((response) => {
        setWishlist(response.data.distinctBooks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setIsLoading(false);
      });
  }, [userId]);

  // Function to handle deleting a book from the wishlist
  const handleDeleteBook = (bookId) => {
    // Show a confirmation prompt to the user
    const confirmDelete = window.confirm('Are you sure you want to remove this book from your wishlist? This action is irreversible');
  
    if (confirmDelete) {
      // Send a DELETE request to the backend to remove the book from the wishlist
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/wishlist/${userId}/${bookId}`)
        .then(() => {
          // If the deletion is successful, update the wishlist state to reflect the changes
          setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== bookId));
        })
        .catch((error) => {
          console.error('Error deleting book from wishlist:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2 className="title2">Wish List for {username}</h2>
      {isLoading ? ( // Show Spin component while loading
        <Spin size="large" />
      ) : wishlist.length === 0 ? (
        <div className="cardContainer">
          <div>No items in the wishlist.</div>
        </div>
      ) : (
        <div className='cardContainer'>
          {wishlist.map((bookId) => (
            <BookItem key={bookId} bookId={bookId} onDelete={() => handleDeleteBook(bookId)} />
          ))}
        </div>
      )}
    </div>
  );
};

const BookItem = ({ bookId, onDelete }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`)
      .then((response) => {
        setBookDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setBookDetails(null);
      });
  }, [bookId]);

  if (!bookDetails) {
    // Handle the case where book details could not be fetched
    return <div>Book details not available.</div>;
  }

  const {
    volumeInfo: {
      title,
      authors,
      publisher,
      description,
      imageLinks,
    },
    saleInfo: {
      buyLink,
      saleability,
    },
  } = bookDetails;

  return (
    <div className="cardContainer">
      <Card className="card">
        <div>
          <img alt={title} src={imageLinks?.thumbnail || 'placeholder.jpg'} />
          <Meta
            title={title}
            description={authors?.join(', ')}
          />
          <div className="bookDetails">
            <p><strong>Publisher:</strong> {publisher || 'N/A'}</p>
            {/* <p><strong>Description:</strong> {description || 'N/A'}</p> */}
            {saleability === 'FOR_SALE' && (
              <p><strong>Status:</strong> Available for Sale</p>
            )}
            {saleability === 'NOT_FOR_SALE' && (
              <p><strong>Status:</strong> Not Available for Sale</p>
            )}
          </div>
        </div>
        {buyLink && (
          <a href={buyLink} target="_blank" rel="noopener noreferrer" className="buyLink">
            Buy Now: {buyLink}
          </a>
        )}
        <div className="actions">
          <button onClick={() => navigate(`/books/${bookId}`)}>View Details</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </Card>
    </div>
  );
};


export default WishList;
