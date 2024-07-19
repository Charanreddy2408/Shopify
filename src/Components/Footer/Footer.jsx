import React from 'react'
import './Footer.css'
import { ThemeContext } from '../ThemeContext/ThemeContext';
import footer_logo from '../Assests/logo_big.png'
import instagram from '../Assests/instagram_icon.png'
import pinterest from '../Assests/pintester_icon.png'
import whatsapp from '../Assests/whatsapp_icon.png'
import { useContext } from 'react';
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`footer ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-social-container">
            <img src={instagram} alt="" />
        </div>
        <div className="footer-social-container">
            <img src={pinterest} alt="" />
        </div>
        <div className="footer-social-container">
            <img src={whatsapp} alt="" />
        </div>
        <div className="copyright">
            <hr />
            <p>CopyRights @ 2024</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
