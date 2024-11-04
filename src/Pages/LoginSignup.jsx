import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Css/Loginsignup.css"
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ThemeContext } from '../Components/ThemeContext/ThemeContext';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [information, setInformation] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    agree: false,
  });
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const { theme } = useContext(ThemeContext);

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleConfirmVisible = () => {
    setConfirmVisible(!confirmVisible);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInformation({
      ...information,
      [name]: type === "checkbox" ? checked : value,
    });

   
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!information.name) {
      validationErrors.name = "Name is required";
    }

    if (!information.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(information.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!information.password) {
      validationErrors.password = "Password is required";
    } else if (information.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    if (!information.ConfirmPassword) {
      validationErrors.ConfirmPassword = "Confirm Password is required";
    } else if (information.password !== information.ConfirmPassword) {
      validationErrors.ConfirmPassword = "Passwords must match";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please correct the highlighted errors", { autoClose: 3000 });
      return;
    }

 
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: information.name,
        email: information.email,
        password: information.password,
      })
    );
    localStorage.setItem(
      "login",
      JSON.stringify({
        name: information.name,
        email: information.email,
        password: information.password,
      })
    );

    toast.success("Signup Successful", { autoClose: 3000 });

    setInformation({
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      agree: false,
    });
    navigate("/");
  };

  return (
    <div className={`loginsignup ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="loginsignupcontainer">
        <h1>Sign Up</h1>
        <div className="loginsignupfields">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={information.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={information.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="pass">
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={information.password}
              onChange={handleInputChange}
            />
            <div className="eye-icon" onClick={handleVisible}>
              {visible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="pass">
            <input
              type={confirmVisible ? "text" : "password"}
              name="ConfirmPassword"
              placeholder="Confirm Password"
              value={information.ConfirmPassword}
              onChange={handleInputChange}
            />
            <div className="eye-icon" onClick={handleConfirmVisible}>
              {confirmVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.ConfirmPassword && <p className="error">{errors.ConfirmPassword}</p>}

          <button
            style={{ opacity: information.agree ? 1 : 0.5 }}
            disabled={!information.agree}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
        <p className="loginsignup-login">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="new-login">Login here</button>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            name="agree"
            checked={information.agree}
            onChange={handleInputChange}
          />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
