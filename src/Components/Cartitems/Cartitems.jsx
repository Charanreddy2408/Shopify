import { useState, useContext } from "react";
import "./Cartitems.css";
import { Shopcontext } from "../../context/Shopcontext";
import removeicon from "../Assests/cart_cross_icon.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import offers from "../Assests/offers"; // Kept as it's used for discounts
import { Link } from "react-router-dom";
import { ThemeContext } from '../ThemeContext/ThemeContext'; 

const Cartitems = () => {
  const { gettotalcartamount, all_product, cartItems, removefromcart } = useContext(Shopcontext);
  const [promo, setPromo] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(gettotalcartamount());
  const [valid, setValid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [sendingEmail, setSendingEmail] = useState(false);

  const { theme } = useContext(ThemeContext); 

  const handleInput = (e) => setPromo(e.target.value);

  const applyDiscount = () => {
    const offer = offers.find((offer) => offer.code === promo);
    if (offer) {
      const discountAmount = (gettotalcartamount() * offer.discount) / 100;
      setDiscountedTotal(gettotalcartamount() - discountAmount);
      toast.success("Promo code applied!", { autoClose: 3000 });
      setValid(true);
      setDiscount(offer.discount);
    } else {
      setDiscountedTotal(gettotalcartamount());
      toast.error("Invalid promo code!", { autoClose: 3000 });
      setValid(false);
    }
  };

  const handleApplyDiscount = (e) => {
    e.preventDefault();
    applyDiscount();
  };

  const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("login"));
    return user && user.name !== "";
  };

  const handleCheckoutClick = () => {
    if (gettotalcartamount() === 0) {
      toast.error("Your cart is empty!", { autoClose: 3000 });
      return; // Early return if the cart is empty
    }

    if (!checkLogin()) {
      toast.error("Login required to proceed to checkout", { autoClose: 3000 });
      return; // Early return if not logged in
    }

    setSendingEmail(true); // Start processing state

    const user = JSON.parse(localStorage.getItem("login"));
    const products = all_product.filter((product) => cartItems[product.id] > 0).map((product) => ({
      name: product.name,
      quantity: cartItems[product.id],
      price: product.new_price,
      total: product.new_price * cartItems[product.id],
    }));

    // You can implement the order processing logic here if needed

    toast.success("Order placed successfully", { autoClose: 3000 });

    setSendingEmail(false); // End processing state
  };

  return (
    <div className={`cartitems ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => (
        cartItems[product.id] > 0 && (
          <div key={product.id}>
            <div className="cartitems-format cartitems-format-main">
              <Link to={`/product/${product.id}`}>
                <img className="carticon-product-icon" src={product.image} alt={product.name} />
              </Link>
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <button className="cartitems-quantity">{cartItems[product.id]}</button>
              <p>${product.new_price * cartItems[product.id]}</p>
              <img
                className="cartitems-remove-icon"
                src={removeicon}
                onClick={() => removefromcart(product.id)}
                alt="Remove"
              />
            </div>
            <hr />
          </div>
        )
      ))}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${gettotalcartamount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            {valid && (
              <>
                <div className="cartitems-total-item">
                  <p>Offer Discount</p>
                  <p>{discount}%</p>
                </div>
                <hr />
              </>
            )}
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${discountedTotal}</h3>
            </div>
          </div>
          <button
            onClick={handleCheckoutClick}
            style={{ opacity: checkLogin() ? 1 : 0.5 }}
            disabled={sendingEmail}
          >
            {sendingEmail ? "Processing..." : "Proceed To Checkout"}
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              name="promocode"
              placeholder="Enter promo code"
              value={promo}
              onChange={handleInput}
            />
            <button onClick={handleApplyDiscount}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
