
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../src/Components/ThemeContext/ThemeContext';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assests/banner_mens.png';
import women_banner from './Components/Assests/banner_women.png';
import kids_banner from './Components/Assests/banner_kids.png';
import Loginpage from './Components/loginpage/Loginpage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/men"
            element={<ShopCategory banner={men_banner} Category="men" />}
          />
          <Route
            path="/women"
            element={<ShopCategory banner={women_banner} Category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kids_banner} Category="kid" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/Signup" element={<LoginSignup />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
