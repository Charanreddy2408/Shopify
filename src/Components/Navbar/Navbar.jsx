import React, { useContext, useState, useEffect } from 'react';
import { Link, Router, useNavigate, useParams, useRoutes } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import './Navbar.css';
import logo from '../Assests/logo.png';
import cart_icon from '../Assests/cart_icon.png';
import { Shopcontext } from '../../context/Shopcontext';

const Navbar = () => {
  const { addToast } = useToasts();
  const params = useParams()
  const navigate = useNavigate();
  const [Menu, setMenu] = useState("shop");
  const { gettotalcartitems } = useContext(Shopcontext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    setIsLoggedIn(login?.name ? true : false);
  }, [params]);

  const handleLogout = () => {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
    addToast("Logged out successfully", { appearance: "success" });
    navigate("/login"); 
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link style={{ textDecoration: "none" }} to="/home">
          <img onClick={() => setMenu("shop")} src={logo} alt="" />
        </Link>
        <p>Shopper</p>
      </div>
      <ul className='menu-bar'>
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/home">Shop</Link>
          {Menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link style={{ textDecoration: "none" }} to="/men">Men</Link>
          {Menu === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link style={{ textDecoration: "none" }} to="/women">Women</Link>
          {Menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">Kids</Link>
          {Menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className='cart'>
        {isLoggedIn ? (
          <button className='login' onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login"><button className='login'>Login</button></Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className='cart-count'>{gettotalcartitems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
