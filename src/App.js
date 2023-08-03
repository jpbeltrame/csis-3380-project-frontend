import "./App.css";
import { Layout, Menu } from "antd";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/userProfile"
import WishList from "./pages/WishList/WishList"
import BookSearchResults from "./components/BookSearchResults/BookSearchResults"
import BookDetail from "./components/BookDetail/BookDetail"
import { Content } from "antd/es/layout/layout";
import { UserProvider } from './UserContext';
// import {useUserContext } from './UserContext'; // Import the useUserContext hook


function App() {

  //TESTING VARIABLES
  // const userIdForTesting = '64c016138b959c393530996a';
  // const [userId,setUserId] = useState('');
  
  // const { userId, username, setUsername } = useUserContext();
  // console.log('App.js - userId:', userId); // Add this line to check the value of userId
  // console.log('App.js - username:', username); // Add this line to check the value of username

  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <Layout hasSider="true">
            <Header />
            <Layout>
              <Content>
                <Routes>
                  <Route index element={<Home />} />
                  {/* <Route path="/about" element={<About />} /> */}
                  <Route path="/searchResults" element={<BookSearchResults/>} />
                  <Route path="/signup" element={<SignUp />} />
                  {/* <Route path="/user" element={<UserProfile userId={userId} username={username} setUsername={setUsername} />} /> */}
                  <Route path="/user" element={<UserProfile />} />
                  {/* <Route path="/wishList" element={<WishList userId={userIdForTesting} />} /> */}
                  <Route path="/wishList" element={<WishList />} />
                  <Route path="/books/:bookId" element={<BookDetail/>} />

                </Routes>
              </Content>  
            </Layout>
            <Footer></Footer>
          </Layout>
        </div>
      </UserProvider>
        
    </BrowserRouter>
  );
}

export default App;
