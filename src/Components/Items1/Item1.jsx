import React, { useEffect, useState,useContext } from "react";
import { Link } from 'react-router-dom';
import "./Item1.css";
import Shimmer from '../shimmer/shimmer'; 
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Item1 = (props) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  return (
    <div className={`item1 ${theme === 'dark' ? 'dark-mode' : ''}`}>
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
