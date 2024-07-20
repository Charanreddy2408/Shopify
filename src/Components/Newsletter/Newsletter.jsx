

import React, { useState } from 'react';
import './Newsletter.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
  const [info, setInfo] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(info.email === "") {
      toast.error("Fields cannot be empty", { autoClose: 3000 });
    } else {
      toast.success("Subscription Successful", { autoClose: 3000 });
    }
  };

  return (
    <div className='Newsletter'>
      <ToastContainer />
      <h1>GET EXCLUSIVE OFFERS ON EMAIL</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={info.email}
          onChange={handleInputChange}
        />
        <button onClick={handleClick}>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
