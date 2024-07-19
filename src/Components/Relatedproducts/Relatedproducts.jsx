import React from 'react'
import './Relatedproducts.css'
import data_products from '../Assests/data'
import { ThemeContext } from '../ThemeContext/ThemeContext';
import Item1 from '../Items1/Item1'
import { useContext } from 'react';
const Relatedproducts = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`relatedproducts ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
     {data_products.map((item,i)=>{
      return <Item1 key={i} id={item.id} name={item.name} img={item.image} oldprice={item.old_price} newprice={item.new_price}/>
     })}
     </div>
    </div>
  )
}

export default Relatedproducts
