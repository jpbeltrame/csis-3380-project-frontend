import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import UserProfile from "./pages/UserProfile/UserProfile"
import WishList from "./pages/WishList/WishList"
import BookSearchResults from "./components/BookSearchResults/BookSearchResults"
import { Content } from "antd/es/layout/layout";


function App() {

  //TESTING VARIABLES
  const userIdForTesting = '64c016138b959c393530996a';

  return (
    <BrowserRouter>
      <div className="App">
        <Layout hasSider="true">
          <Header />
          <Layout>
            <Content>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user" element={<UserProfile userId={userIdForTesting} />} />
                <Route path="/wishList" element={<WishList userId={userIdForTesting} />} />
                <Route path="/searchResults" element={<BookSearchResults/>} />
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
