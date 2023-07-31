import "./Header.css";
import React, { useState } from "react";
import {
  Avatar,
  Menu,
  Dropdown,
  Input,
} from "antd";
import { Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook to display the results of the search

const { Search } = Input;
// const onSearch = (value) => console.log(value);

function Header( ) {
  const routes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
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

  return (
    <div className="header">
      <Title
        style={{
          background: "#27024B",
          color: "#F3ECEC",
          padding: "3% 0% 0% 3%",
          fontSize: "70px",
          fontWeight: "bolder",
          fontFamily: "Arial",
        }}
      >
        BookTrackr
        <div className="search">
          <Search
           style={{
            margin: "0 17% 0 0",
          width:'70%'}}
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
            <Avatar
              src={<img src={url} alt="an user avatar" />}
              size={80}
              style={{
                float: "right",
                // margin: "5px",
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </div>
      </Title>
    </div>
  );
}

export default Header;
