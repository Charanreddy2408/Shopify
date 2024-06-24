import React from "react";
import Herostyle from "./Herostyle.css";
import hand from "../Assests/hand_icon.png";
import arrow from "../Assests/arrow.png";
import hero from "../Assests/hero_image.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>New Arrivals only</h2>
        <div >
          <div className="hand-icon">
            <p>New</p>
            <img src={hand} alt="" />
          </div>
          <p>collections</p>
          <p>for EveryOne</p>
        </div>
        <div className="latest-btn">
          <div>LatestCollection</div>
          <img src={arrow} alt="" />
        </div>
      </div>
      <div  className="hero-right" >
        <img src={hero} alt="" />
      </div>
    </div>
  );
};
export default Hero;