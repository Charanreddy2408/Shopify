import React, { useState, createContext } from "react";
import all_product from "../Components/Assests/all_product";
// import { useSearchParams } from "react-router-dom";
// import Cartitems from "../Components/Cartitems/Cartitems";
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
    console.log(itemid,cartItems[itemid],"dd")
    setCartItems(() => ({ ...cartItems, [itemid]: cartItems[itemid] + 1 }));
    console.log(cartItems);
  };
  const removefromcart = (itemid) => {
    
    setCartItems((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    console.log(cartItems);
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
