import React from "react";
import "./Newcollections.css";
import Newcollection from "../Assests/new_collections";
import Item1 from "../Items1/Item1";
const Newcollections = () => {
  return (
    <div className="Newcollections">
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
