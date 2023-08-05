import "./App.css";
import { Layout } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/userProfile"
import WishList from "./pages/WishList/WishList"
import BookSearchResults from "./pages/BookSearchResults/BookSearchResults"
import BookDetail from "./pages/BookDetail/BookDetail"

import { Content } from "antd/es/layout/layout";
import { UserProvider } from './UserContext';


function App() {
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
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/user" element={<UserProfile />} />
                  <Route path="/wishList" element={<WishList />} />
                  <Route path="/searchResults" element={<BookSearchResults/>} />
                  <Route path="/books/:bookId" element={<BookDetail/>} />

                  {/* <Route path="/about" element={<About />} /> */}
                  {/* <Route path="/user" element={<UserProfile userId={userId} username={username} setUsername={setUsername} />} /> */}
                  {/* <Route path="/wishList" element={<WishList userId={userIdForTesting} />} /> */}
                </Routes>
              </Content>  
            </Layout>
            <Footer />
          </Layout>
        </div>
      </UserProvider>
        
    </BrowserRouter>
  );
}

export default App;
