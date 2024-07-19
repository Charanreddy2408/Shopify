import React, { useState } from 'react';
import './Newsletter.css';
import { useToasts } from 'react-toast-notifications';

const Newsletter = () => {
  const {addToast}=useToasts()
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
    if(info.email===""){
      addToast("fields cannot be empty",{appearance:'error',autoDismissTimeout: 3000,  autoDismiss: true})
    }
    else{
    addToast("Subscription Succesfull",{appearance:'success',autoDismissTimeout: 3000,  autoDismiss: true})
    }
  };

  return (
    <div className='Newsletter'>
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
