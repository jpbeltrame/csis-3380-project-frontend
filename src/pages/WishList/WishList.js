import "./WishList.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';

const WishList = ({ userId }) => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile data, including wishlist
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/wishlist/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setIsLoading(false);
      });
  }, [userId]); // Use userId as a dependency in the useEffect to trigger the API request whenever it changes

  if (isLoading) {
    return <Spin size="large" />; // Show a loading spinner while data is loading
  }

  const { name, wishlist } = userProfile;

  return (
    <div className="container">
      <h2 className="title">Wish List for {name}</h2>
      {wishlist.length === 0 ? (
        <div className="cardContainer">
        <div>No items in the wishlist.</div>
        </div>
      ) : (
        wishlist.map((item, index) => (
        <div className="cardContainer">
          <Card key={index} style={{ width: 300 }}>
            <p>Item: {item}</p>
          </Card>
        </div>
        ))
      )}
    </div>
  );
};

export default WishList;
