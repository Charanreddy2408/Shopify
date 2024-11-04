import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("login");
    toast.success("Logout Successful", { autoClose: 3000 });
    navigate("/login"); 
  };

  return (
    <>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <ToastContainer />
    </>
  );
};

export default LogoutButton;
