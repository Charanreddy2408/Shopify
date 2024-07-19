import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./Loginpage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Loginpage = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    // Clear error messages when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let validationErrors = {};

    if (!data.name) {
      validationErrors.name = "Name is required";
    }

    if (!data.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!data.password) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast("Please correct the highlighted errors", { appearance: "error",autoDismissTimeout: 3000,  autoDismiss: true });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (
        user.name === data.name &&
        user.email === data.email &&
        user.password === data.password
      ) {
        addToast("Login Successful", { appearance: "success",autoDismissTimeout: 3000,  autoDismiss: true });
        navigate("/home");
        localStorage.setItem(
          "login",
          JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          })
        );
      } else {
        setErrors({ password: "Invalid credentials" });
        addToast("Invalid credentials", { appearance: "error",autoDismissTimeout: 3000,  autoDismiss: true});
      }
    } else {
      setErrors({ password: "User does not exist" });
      addToast("User does not exist", { appearance: "error",autoDismissTimeout: 3000,  autoDismiss: true });
    }
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className={`logindetails ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="logincontainer">
        <h1>Login</h1>
        <div className="loginfields">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={data.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="pass">
            <input
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleInputChange}
            />
            <div className="eye-icon" onClick={handleVisible}>
              {visible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <button onClick={handleSubmit}>Continue</button>
        </div>
        <p className="signup">
          New account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="signupbutton">Signup here</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
