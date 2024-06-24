import React from 'react'
import './Relatedproducts.css'
import data_products from '../Assests/data'
import Item1 from '../Items1/Item1'
const Relatedproducts = () => {
  return (
    <div className='relatedproducts'>
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
