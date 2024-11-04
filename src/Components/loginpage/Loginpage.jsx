import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Loginpage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ThemeContext } from '../ThemeContext/ThemeContext';

const Loginpage = () => {
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
      toast.error("Please correct the highlighted errors", { autoClose: 3000 });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (
        user.name === data.name &&
        user.email === data.email &&
        user.password === data.password
      ) {
        toast.success("Login Successful", { autoClose: 3000 });
        navigate("/");
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
        toast.error("Invalid credentials", { autoClose: 3000 });
      }
    } else {
      setErrors({ password: "User does not exist" });
      toast.error("User does not exist", { autoClose: 3000 });
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
      <ToastContainer />
    </div>
  );
};

export default Loginpage;
