import React from "react";
import "./Newcollections.css";
import Newcollection from "../Assests/new_collections";
import Item1 from "../Items1/Item1";
import { useContext } from "react";
import { ThemeContext } from '../ThemeContext/ThemeContext';
const Newcollections = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`Newcollections ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {Newcollection.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};

export default Newcollections;
