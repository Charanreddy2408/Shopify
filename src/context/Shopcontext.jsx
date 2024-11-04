import React, { useState, createContext } from "react";
import all_product from "../Components/Assests/all_product";
// Removed Cartitems import since it's not used

export const Shopcontext = createContext(null);

const getDefaultcart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const Shopcontextprovider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultcart());

  const addtocart = (itemid) => {
    setCartItems(() => ({ ...cartItems, [itemid]: cartItems[itemid] + 1 }));
  };

  const removefromcart = (itemid) => {
    setCartItems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
  };

  const gettotalcartamount = () => {
    let totalamount = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = all_product.find(
          (Product) => Product.id === Number(item)
        );
        totalamount += iteminfo.new_price * cartItems[item];
      }
    }
    return totalamount;
  };

  const gettotalcartitems = () => {
    let totalsize = 0;

    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        totalsize += cartItems[item];
      }
    }
    return totalsize;
  };

  const contextvalue = {
    gettotalcartitems,
    gettotalcartamount,
    all_product,
    cartItems,
    addtocart,
    removefromcart,
  };

  return (
    <Shopcontext.Provider value={contextvalue}>
      {props.children}
    </Shopcontext.Provider>
  );
};

export default Shopcontextprovider;
