import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Layout, Card, Row, Col, Button, message} from 'antd';
import { useUserContext } from '../../UserContext'; // Import the useUserContext hook
import { CheckOutlined } from '@ant-design/icons'; // Import the icon from Ant Design

const { Content } = Layout;

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState(null);
  const { userId, username } = useUserContext(); // Access the userId from the context
  const [isInWishlist, setIsInWishlist] = useState(false); // State to store if the book is in the wishlist
  const [wishlistUpdated, setWishlistUpdated] = useState(false); //Add a new state variable to track the status of the wishlist update:

  useEffect(() => {
    // Fetch book details based on the bookId from the URL params
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
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      imageLinks,
    },
    saleInfo,
    accessInfo,
  } = bookDetail;

  // Function to handle adding the book to the user's wishlist
  const handleAddToWishlist = () => {
      // Log the data being sent in the POST request
  const postData = {
    name: `${username}'s Wishlist`, // Set a default name for the wishlist
    public: false, // Set a default value for the 'public' field
    user_id: `${userId}`, // Use the userId obtained from the context
    book: bookId, // Add the book to the wishlist as an array (you can add more books if needed)
  };
  console.log('POST Data:', postData);

    // Send a POST request to create the wishlist and add the book to it
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/wishlist`, postData)
    .then((response) => {
      console.log('Book added to wishlist:', response.data);

      // Update the state to reflect that the book is now in the wishlist
      setIsInWishlist(true);

        // Set the wishlistUpdated state to true to show the checkmark message
      setWishlistUpdated(true);

      // Optionally, you can show a success message or update the UI to reflect the book being added to the wishlist
      message.success('Book added successfully!'); // Show a success message
    })
    .catch((error) => {
      console.error('Error adding book to wishlist:', error);
      // Optionally, you can show an error message or handle the error in any other way
      message.error('Failed to add to wishlist. Please try again.'); // Show an error message
    });
  };

  return (
    <Layout>
      <Content style={{ padding: '50px', minHeight: 'calc(100vh - 64px)' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8}>
              {imageLinks && imageLinks.large && (
                <img
                  src={imageLinks.large}
                  alt={title}
                  style={{ maxHeight: '400px', objectFit: 'contain', width: '100%' }}
                />
              )}
            {wishlistUpdated ? (
              <div style={{ display: 'block', alignItems: 'center', marginLeft: '150px' }}>
                <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                <span>Book already in your wishlist</span>
              </div>
            ) : isInWishlist ? (
              <div style={{ display: 'block', alignItems: 'center', marginLeft: '150px' }}>
                <CheckOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                <span>Book already in your wishlist</span>
              </div>
            ) : (
              <Button onClick={handleAddToWishlist} type="primary" block>
                Add to Wishlist
              </Button>
            )}

            {/* ... (other parts of the component) */}
            </Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              <div>
                <h2>{title}</h2>
                {authors && <p>Authors: {authors.join(', ')}</p>}
                {publisher && <p>Publisher: {publisher}</p>}
                {pageCount && <p>Pages: {pageCount}</p>}
                { saleInfo ? (
                  <p>
                    Saleability: {saleInfo.saleability} - Ebook: {saleInfo.isEbook ? 'Yes' : 'No'}
                  </p>
                ) : (
                  <p>No sale information available</p>
                )}
                { saleInfo.buyLink ? (
                  <p> Buy link: <a href= {saleInfo.buyLink}> {saleInfo.buyLink} </a> </p>
                ) : (
                  <p> No buy link Available </p>
                )}
                {description && 
                  <div dangerouslySetInnerHTML={{__html: description}}></div>
                  }
                {/* Add more details as needed */}
              </div>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};


export default BookDetail;
