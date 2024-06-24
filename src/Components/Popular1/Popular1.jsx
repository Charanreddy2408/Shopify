import React from 'react'
import './Popular1.css'
import data_product from '../Assests/data'
import Item1 from '../Items1/Item1'
const popular = (props) => {
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
      <div className="popular-item">
        {data_product.map((item,i)=>{
          return <Item1 key={i} id={item.id} name={item.name} img={item.image} oldprice={item.old_price} newprice={item.new_price}/>
        })}
      </div>
    </div>
  )
}

export default popular
