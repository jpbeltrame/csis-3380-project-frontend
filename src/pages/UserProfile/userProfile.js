import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Spin } from "antd";
import { useUserContext } from "../../UserContext"; // Import the useUserContext hook

const UserProfile = () => {
  const { userId, username, setUsername } = useUserContext(); // Access the userId from the context
  // const { userId, username, setUsername } = props; // Access the userId and username and setUsername function from props
  console.log("userId", userId);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  // const [username, setUsername] = useState('');

  useEffect(() => {
    console.log(userId);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        setName(response.data.name);
        setUsername(response.data.login.username);
        setIsLoading(false);
        console.log("name", name);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to save the changes?"
    );

    if (isConfirmed) {
      // Send a POST request to update the user profile

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${userId}`, {
          name,
          login: {
            username,
          },
        })
        .then((response) => {
          setUserProfile(response.data);
          setIsEditMode(false);
          alert("Changes saved successfully!");
          setUsername(username); // Update the username in the context
        })
        .catch((error) => {
          console.error("Error updating user profile:", error);
          alert("Failed to save changes. Please try again.");
        });
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h2 className="title">User Profile</h2>
      <div className="cardContainer">
        <Card id="user" style={{ width: 300 }}>
          {isEditMode ? (
            <>
              <p id="pName">
                Name:{" "}
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p id="pUsername">
                Username:{" "}
                <input
                  type="text"
                  id="Profusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
              <div id="btnSave">
                <button onClick={handleSaveClick}>
                  Save</button>
              </div>
            </>
          ) : (
            <>
              <p id="editName">Name:  <input
                  type="text"
                  id="formName"
                  value={userProfile.name}/></p>
              <p id="editUsername">Username: <input
                  type="text"
                  id="formUsername"
                  value={userProfile.login.username}/> </p>
                  <div id="btnEdit">
                  <button onClick={handleEditClick}>Edit</button>
                  </div>
             
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
