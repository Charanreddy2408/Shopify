import React, { useContext } from "react";
import "./Productdisplay.css";
import star from "../Assests/star_icon.png";
import stardull from "../Assests/star_dull_icon.png";
import { Shopcontext } from "../../context/Shopcontext";
import { ThemeContext } from '../ThemeContext/ThemeContext';
const Productdisplay = (props) => {
  const { theme } = useContext(ThemeContext);
  const { product } = props;
  const { addtocart,removefromcart,cartItems} = useContext(Shopcontext);
  return (
    <div className={`productdisplay ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="product-display-img">
          <img src={product.image} className="productdisplaymain-img" alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={stardull} alt="" />
          <p>122</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight,usually knitted,pullover shirt,close-fiiting a round
          neckline
        </div>
        <div className="productdisplay-rightsize">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div className="size"><p>S</p></div>
            <div className="size"><p>M</p></div>
            <div className="size"><p>L</p></div>
            <div className="size"><p>XL</p></div>
            <div className="size"><p>XXL</p></div>
          </div>
        </div>
        {cartItems[product.id]===0?<button className="initalcart"
          onClick={() => {
            addtocart(product.id);
          }}
        >
          ADD TO CART
        </button> :<div>
      {cartItems[product.id] === 0 || cartItems[product.id] === undefined ? (
        <button
          onClick={() => {
            addtocart(product.id);
          }}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="cartincrement">
          <button className="cartitem" onClick={() => removefromcart(product.id)}>-</button>
          <span>{cartItems[product.id]}</span>
          <button className="cartitem" onClick={() => addtocart(product.id)}>+</button>
        </div>
      )}
    </div>
         }
        
      </div>
    </div>
  );
};

export default Productdisplay;
