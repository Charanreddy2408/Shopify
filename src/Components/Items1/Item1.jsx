import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Item1.css";
import Shimmer from '../shimmer/shimmer'; 

const Item1 = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  return (
    <div className="item">
      <div className="item1">
        <Link to={`/product/${props.id}`}>
          {loading ? (
            <Shimmer /> 
          ) : (
            <img onClick={() => window.scrollTo(0, 0)} src={props.img} alt="" />
          )}
        </Link>
        <p>{loading ? "Loading..." : props.name}</p>
        <div className="prices">
          <div className="oldprice">${props.oldprice}</div>
          <div className="newprice">${props.newprice}</div>
        </div>
      </div>
    </div>
  );
};

export default Item1;
