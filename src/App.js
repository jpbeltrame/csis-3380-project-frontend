import "./App.css";
import { Layout, Menu } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { Content, Footer } from "antd/es/layout/layout";

function App() {

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
              </Routes>
            </Content>
            
          </Layout>
          <Footer> foooo</Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
