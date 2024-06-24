import React from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const LogoutButton = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    addToast("Logout Successful", { appearance: "success" });
    navigate("/login"); 
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
