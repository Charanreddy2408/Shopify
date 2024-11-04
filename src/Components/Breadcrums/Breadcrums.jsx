import React from 'react'
import './Breadcrum.css'
import arrow from '../Assests/breadcrum_arrow.png'
const Breadcrums = (props) => {
    const {product}=props;
  return (
    <div className='Breadcrum'>
      HOME <img src={arrow} alt="" />SHOP <img src={arrow} alt="" />{product.category} <img src={arrow} alt="" /> {product.name} <img src={arrow} alt="" />
      
    </div>
  )
}

export default Breadcrums
