import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrums";
import Productdisplay from "../Components/Productdisplay/Productdisplay";
import Relatedproducts from "../Components/Relatedproducts/Relatedproducts";


const Product = () => {
  const { all_product } = useContext(Shopcontext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <Relatedproducts/>
    </div>
  );
};

export default Product;
