import "./UserProfile.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin, Button,
  Form,
  Input,
  Switch,
  Upload, } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';

const UserProfile = (props) => {
  const { userId } = props;
  console.log('userprofile',userId);
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    console.log(userId);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}users/profile/${userId}`)
      .then((response) => {
        setUserProfile(response.data);
        setName(response.data.name);
        setUsername(response.data.login.username);
        setIsLoading(false);
        console.log("name",name);
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
    <div>
      <h2 className="title">User Profile</h2>
      {/* <div className="cardContainer">
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
        </Card> */}
       
        {isEditMode? (
          <div className="userForm">
           <Form
           labelCol={{
             span: 4,
           }}
           wrapperCol={{
             span: 14,
           }}
           layout="horizontal"
          //  max-width='600px'
         >
 <Form.Item label="Edit" valuePropName="checked"  >
 <Switch onChange={(e) => handleEditClick()} defaultChecked="true"/>
</Form.Item>
<Form.Item name="fullname" label="Your Name" initialValue={name} onChange={(e) => setName(e.target.value)}>
<Input />
</Form.Item>
<Form.Item name="username" label="Username"  initialValue={username} onChange={(e) => setUsername(e.target.value)}>
<Input />
</Form.Item>         
<Form.Item label="Avatar" valuePropName="fileList">
 <Upload action="/upload.do" listType="picture-card">
   <div>
     <PlusOutlined />
     <div
       style={{
         marginTop: 8,
       }}
     >
       Upload
     </div>
   </div>
 </Upload>
</Form.Item>
<Form.Item className="button">
<Button onClick={handleSaveClick}>Save</Button>
</Form.Item>
</Form>
</div>
        ):
        (
          <>
               
                <p className="switch">Edit 
                <Switch onChange={(e) => handleEditClick()}/>
                </p>
                <div className="userFormDisabled">
          <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={true}
      >
          
         <Form.Item name="fullname" label="Your Name" initialValue={name}>
         <Input />
         </Form.Item>
         <Form.Item name="username" label="Username"  initialValue={username}>
         <Input />
         </Form.Item>         
         <Form.Item label="Avatar" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
         </Form.Item>
         <Form.Item className="button">
         </Form.Item>
         </Form>
         </div>
         </>

        )}
          
      
      </div>
    // </div>
  );
};

export default UserProfile;
