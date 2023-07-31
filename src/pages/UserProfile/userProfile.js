import "./UserProfile.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';

const UserProfile = (props) => {
  const { userId } = props;
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}users/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        setName(response.data.name);
        setUsername(response.data.login.username);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to save the changes?');
  
    if (isConfirmed) {
      // Send a POST request to update the user profile
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`, {
        name,
        login: {
          username,
        },
      })
      .then((response) => {
        setUserProfile(response.data);
        setIsEditMode(false);
        alert('Changes saved successfully!');
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
        alert('Failed to save changes. Please try again.');
      });
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <h2 className="title">User Profile</h2>
      <div className="cardContainer">
        <Card style={{ width: 300 }}>
          {isEditMode ? (
            <>
              <p>Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></p>
              <p>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></p>
              <button onClick={handleSaveClick}>Save</button>
            </>
          ) : (
            <>
              <p>Name: {userProfile.name}</p>
              <p>Username: {userProfile.login.username}</p>
              <button onClick={handleEditClick}>Edit</button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
