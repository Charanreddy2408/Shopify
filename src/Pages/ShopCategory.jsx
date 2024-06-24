import React, { useContext } from "react";
import "./Css/Shopcategory.css";
import { Shopcontext } from "../context/Shopcontext";
import dropdown from "../Components/Assests/dropdown_icon.png";
import Item1 from "../Components/Items1/Item1";
const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);
  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>showing 1-12 </span>out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.Category===item.category) {
            return (
              <Item1
                key={i}
                id={item.id}
                name={item.name}
                img={item.image}
                oldprice={item.old_price}
                newprice={item.new_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
