import React, { useState, useContext } from "react";
import "./Cartitems.css";
import { Shopcontext } from "../../context/Shopcontext";
import removeicon from "../Assests/cart_cross_icon.png";
import { useToasts } from "react-toast-notifications";
import offers from "../Assests/offers";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

const Cartitems = () => {
  const { addToast } = useToasts();
  const { gettotalcartamount, all_product, cartItems, removefromcart } = useContext(Shopcontext);
  const [promo, setPromo] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(gettotalcartamount());
  const [valid, setValid] = useState(false);
  const [discount, setDiscount] = useState();
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleInput = (e) => setPromo(e.target.value);

  const applyDiscount = () => {
    const offer = offers.find((offer) => offer.code === promo);
    if (offer) {
      const discountAmount = (gettotalcartamount() * offer.discount) / 100;
      setDiscountedTotal(gettotalcartamount() - discountAmount);
      addToast("Promo code applied!", { appearance: "success" });
      setValid(true);
      setDiscount(offer.discount);
    } else {
      setDiscountedTotal(gettotalcartamount());
      addToast("Invalid promo code!", { appearance: "error" });
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

  const handleCheckoutClick = async () => {
    if (!checkLogin()) {
      addToast("Login required to proceed to checkout", { appearance: "error" });
    } else {
      setSendingEmail(true);

      const user = JSON.parse(localStorage.getItem("login"));
      const products = all_product.filter((product) => cartItems[product.id] > 0).map((product) => ({
        name: product.name,
        quantity: cartItems[product.id],
        price: product.new_price,
        total: product.new_price * cartItems[product.id],
      }));
  
      // Generating product list HTML
      const productItems = products.map((product) => `
        <li>
          ${product.name}<br>
          Quantity: ${product.quantity}<br>
          Unit Price: $${product.price}<br>
          Total: $${product.total}
        </li>
      `).join('');
  
      const templateParams = {
        to_name: user.name,
        to_email: user.email,
        from_name: "charan",
        // products: productItems, // Pass the HTML structure directly
        total_amount: discountedTotal,
      };
  

console.log('Template Params:', templateParams);

try {
  await emailjs.send(
    "service_j1jadl7", 
    "template_mcm58sj", 
    templateParams,
    "MU2-rw7oEId1SCy-x" 
  );

  addToast("Order placed and confirmation email sent", {
    appearance: "success",
  });
} catch (error) {
  console.error("Error sending email:", error);
  addToast("Error sending order confirmation email", {
    appearance: "error",
  });
} finally {
  setSendingEmail(false);
}

    }
  };

  return (
    <div className="cartitems">
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
                <img className="carticon-product-icon" src={product.image} alt="" />
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
            {valid && discount != null && (
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
            <button onClick={handleApplyDiscount} disabled={sendingEmail}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
