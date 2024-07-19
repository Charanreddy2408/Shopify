// src/components/Popular.js

import React, { useContext } from 'react';
import './Popular1.css';
import data_product from '../Assests/data';
import Item1 from '../Items1/Item1';
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Popular = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`popular ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => (
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

export default Popular;
