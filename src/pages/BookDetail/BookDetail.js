import './BookDetail.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Card, Row, Col, Button, message } from 'antd';
import { useUserContext } from '../../UserContext';

import BookCover from '../../components/BookCover/BookCover'
import Reviews from '../../components/Reviews/Reviews'
import BookInfo from '../../components/BookInfo/BookInfo';

const { Content } = Layout;

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const { userId, username } = useUserContext();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`)
      .then((response) => {
        setBookDetail(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });

    // Check if the book is in any of the user's wishlists
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/wishlist/${userId}/${bookId}`)
      .then((response) => {
        setIsInWishlist(response.data.isInWishlist);
      })
      .catch((error) => {
        console.error('Error checking wishlist:', error);
      });
  }, [bookId, userId]);

  if (!bookDetail) {
    return <div>Loading...</div>;
  }

  const {
    volumeInfo: {
      title,
      imageLinks,
    },
  } = bookDetail;

  // Function to handle adding the book to the user's wishlist
  const handleAddToWishlist = () => {
    const postData = {
      name: `${username}'s Wishlist`, // Set a default name for the wishlist
      public: false,
      user_id: `${userId}`,
      book: bookId,
    };

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, postData)
      .then((response) => {
        console.log('Book added to wishlist:', response.data);
        setIsInWishlist(true);
        setWishlistUpdated(true);
        message.success('Book added successfully!'); // Show a success message
      })
      .catch((error) => {
        console.error('Error adding book to wishlist:', error);
        message.error('Failed to add to wishlist. Please try again.');
      });
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8}>
              <BookCover imageLinks={imageLinks} alt={title} />

              {wishlistUpdated ? (
                <div style={{ display: 'block', alignItems: 'center', marginLeft: '150px' }}>
                  <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  <span>Book already in your wishlist</span>
                </div>
              )    
                :
                isInWishlist ? (
                  <div style={{ display: 'block', alignItems: 'center', marginLeft: '150px' }}>
                    <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <span>Book already in your wishlist</span>
                  </div>
                ) : (
                  <Button onClick={handleAddToWishlist} type="primary" block>
                    Add to Wishlist
                  </Button>
                )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              <BookInfo bookDetail={bookDetail} />
              <Reviews bookId={bookId} /> 
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};


export default BookDetail;
