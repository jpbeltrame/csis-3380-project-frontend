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
import { Content } from "antd/es/layout/layout";


function App() {

  //TESTING VARIABLES
  // const userIdForTesting = '64c016138b959c393530996a';
  const [userId,setUserId] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        <Layout hasSider="true">
          <Header setUserId={setUserId}/>
          <Layout>
            <Content>
              <Routes>
                <Route index element={<Home />} />
                {/* <Route path="/about" element={<About />} /> */}
                <Route path="/searchResults" element={<BookSearchResults/>} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/user" element={<UserProfile userId={userIdForTesting} />} /> */}
                <Route path="/user" element={<UserProfile userId={userId}/>} />
                {/* <Route path="/wishList" element={<WishList userId={userIdForTesting} />} /> */}
                <Route path="/wishList" element={<WishList userId={userId} />} />
                
              </Routes>
            </Content>
            
          </Layout>
          <Footer></Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
