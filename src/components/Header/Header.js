import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Menu,
  Dropdown,
  Input,
} from "antd";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook to display the results of the search
import Login from "../../pages/Login/Login";

const { Search } = Input;
// const onSearch = (value) => console.log(value);



function Header({setUserId}) {
  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "User Profile",
      path: "/user",
    },
    {
      name: "Wish Lists",
      path: "/wishList",
    },
    {
      name: "Sign out",
      path: "/",
    },
  ];

  const menuItems = routes.map((route) => (
    <Menu.Item key={route.path}>
      <a href={route.path}>{route.name}</a>
    </Menu.Item>
  ));

  const { Title } = Typography;
  const url = "man.png";
  const [username,setUsername] = useState('');
  // const [userId,setUserId] = useState('');


//  const login = document.getElementById('loginDiv');

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };

  const navigate = useNavigate(); //Create a navigate variable using useNavigate to go to result

  const handleSearch = (value) => {
    // onSearch(value); 
    // Navigate to the "/searchResults" route with the search query as a state location
    navigate("/searchResults", { state: { searchQuery: value } });
  };

  const menu = (
    <Menu theme="dark" selectedKeys={[]} style={{ marginTop: "5px" }}>
      {menuItems}
    </Menu>
  );

  // const handleUsername = (newUsername) =>{
  //   setUsername(newUsername);
  //   console.log("username:", username);
  // }

  return (
    <div className="header">
        <Login setUsername ={setUsername} setUserId={setUserId}/>
      <Title
        style={{
          background: "#27024B",
          color: "#F3ECEC",
          padding: "3% 2% 0% 3%",
          fontSize: "70px",
          fontWeight: "bolder",
          fontFamily: "Arial",
          margin: "0"
        }}
      >
        BookTrackr
       
        {/* <div className="search"> */}
          <Search
           style={{
            margin: "2% 10% 0 0",
          width:'60%',
        padding:'0 10% 0 20%'}}
            placeholder="Enter your book title"
            allowClear
            enterButton="Track it"
            size="middle"
            onSearch={handleSearch} // Call the handleSearch function when search button is clicked
          />
          <Dropdown
            style={{}}
            overlay={menu}
            visible={menuVisible}
            onVisibleChange={toggleMenuVisible}
            trigger={["click"]}
            placement="bottomRight"
          >
             <Link to="/user" style={{ float: "right", marginRight: "1rem" }}>
            <Avatar id="avatar"
              src={<img src={url} alt="an user avatar" />}
              size={80}
              style={{
                float: "right",
                visibility:username? "visible": "hidden",
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
            </Link>
          </Dropdown>
        {/* </div> */}
      </Title>
      {username && (
         <p style={{ color: '#FFF6FF', float: 'right', fontSize: 'initial',paddingRight:'2rem',margin:'0 0 1rem'}}>
           Welcome {username}
         </p>
      )}
    </div>
  );
}

export default Header;
