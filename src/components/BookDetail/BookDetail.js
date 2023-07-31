import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Layout, Card, Row, Col } from 'antd';

const { Content } = Layout;

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState(null);

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
  }, [bookId]);

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
            </Col>
            <Col xs={24} sm={24} md={12} lg={16}>
              <div>
                <h2>{title}</h2>
                {authors && <p>Authors: {authors.join(', ')}</p>}
                {publisher && <p>Publisher: {publisher}</p>}
                {pageCount && <p>Pages: {pageCount}</p>}
                {saleInfo && (
                  <p>
                    Saleability: {saleInfo.saleability} - Ebook: {saleInfo.isEbook ? 'Yes' : 'No'}
                  </p>
                )}
                {description && <p>Description: {description}</p>}
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
