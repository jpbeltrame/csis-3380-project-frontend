import './BookDetail.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { Layout, Card, Row, Col, Button, message } from 'antd';
import { useUserContext } from '../../UserContext';

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

  function BookCover(props) {
    const path = props.imageLinks && props.imageLinks.thumbnail ? props.imageLinks.thumbnail : '/no-cover.jpg';
    const alt = props.alt;
    return (
      <img
        src={path}
        alt={alt}
        style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
      />
    );
  }

  function BookDetail({ bookDetail }) {

    const book = bookDetail.volumeInfo;
      
    const title = book.title ?? '';
    const authors = book.authors ?? [];
    const publisher = book.publisher ?? '';
    const pageCount = book.pageCount ?? '';
    const description  = book.description ?? '';

    
    const saleability = bookDetail.saleInfo.saleability ?? '';
    const isEbook = !!(bookDetail.saleInfo.isEbook);
    const buyLink = bookDetail.saleInfo.buyLink ?? ' - ';


    return (
      <div>
        <h2 style={{marginTop: 0}}>{title}</h2>
        <span><b>Authors:</b> {authors.join(', ')}</span><br />
        <span><b>Publisher:</b> {publisher}</span><br />
        <span><b>Pages:</b> {pageCount}</span><br />

        {saleability ? (
          <span><b>Saleability:</b> {saleability} - <b>Ebook:</b> {isEbook ? 'Yes' : 'No'}</span>
        ) : (
          <p>No sale information available</p>
        )} <br />
        
        <span><b>Buy link:</b> <a target='_blank' rel='noreferrer' href={buyLink}> {buyLink} </a> </span> 

        <h3>Description</h3>
        <div className='book-description' dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    );
  }
  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8}>
              <BookCover imageLinks={imageLinks} alt={title} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              <BookDetail bookDetail={bookDetail} />
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};


export default BookDetail;