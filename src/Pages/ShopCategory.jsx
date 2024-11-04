import React, { useContext, useState } from "react";
import "./Css/Shopcategory.css";
import { Shopcontext } from "../context/Shopcontext";
// import dropdown from "../Components/Assests/dropdown_icon.png";
import Item1 from "../Components/Items1/Item1";

const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...all_product]
    .filter(item => item.category === props.Category)
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return a.new_price - b.new_price;
      } else if (sortOption === "high-to-low") {
        return b.new_price - a.new_price;
      } else {
        return 0; 
      }
    });

  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12 </span>out of 36 products
        </p>
        <div className="shopcategory-sort">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-dropdown">
      <option value="">None</option>
      <option value="low-to-high">Low to High</option>
      <option value="high-to-low">High to Low</option>
    </select>
          {/* <img src={dropdown} alt="" /> */}
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item, i) => (
          <Item1
            key={i}
            id={item.id}
            name={item.name}
            img={item.image}
            oldprice={item.old_price}
            newprice={item.new_price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
