

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';
import logo from '../Assests/logo.png';
// import cart_icon from '../Assests/cart_icon.png';
import { Shopcontext } from '../../context/Shopcontext';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { FaShoppingCart, FaToggleOff, FaToggleOn } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [Menu, setMenu] = useState("shop");
  const { gettotalcartitems } = useContext(Shopcontext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    setIsLoggedIn(login?.name ? true : false);
  }, [params]);

  const handleLogout = () => {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
    toast.success("Logged out successfully", { autoClose: 3000 });
    navigate("/login"); 
  };

  return (
    <div className={`navbar ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className='nav-logo'>
        <Link style={{ textDecoration: "none" }} to="/">
          <img onClick={() => setMenu("shop")} src={logo} alt="Shopper Logo" />
        </Link>
        <p>Shopper</p>
      </div>
      <ul className='menu-bar'>
        <li onClick={() => setMenu("shop")}>
          <Link className='navcontent' style={{ textDecoration: "none" }} to="/">Shop</Link>
          {Menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link className='navcontent' style={{ textDecoration: "none" }} to="/men">Men</Link>
          {Menu === "men" && <hr />}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link className='navcontent' style={{ textDecoration: "none" }} to="/women">Women</Link>
          {Menu === "women" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link className='navcontent' style={{ textDecoration: "none" }} to="/kids">Kids</Link>
          {Menu === "kids" && <hr />}
        </li>
      </ul>
      <div className='cart'>
        {isLoggedIn ? (
          <button className='login' onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"><button className='login'>Login</button></Link>
        )}
        <Link to="/cart">
          {theme === 'dark' ? <FaShoppingCart size={30} color='white' /> : <FaShoppingCart size={30} color='black' />}
        </Link>
        <div className='cart-count'>{gettotalcartitems()}</div>
      </div>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {theme === 'light' ? <FaToggleOff size={30} /> : <FaToggleOn size={30} />}
      </button>
    </div>
  );
}

export default Navbar;
