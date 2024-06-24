import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import "./Css/Loginsignup.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const LoginSignup = () => {
  const { addToast } = useToasts();
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
  const [passwordError, setPasswordError] = useState("");
  const [fieldError, setFieldError] = useState("");

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

    if (name === "password" || name === "ConfirmPassword") {
      setPasswordError("");
    }
    if (
      name === "name" ||
      name === "email" ||
      name === "password" ||
      name === "ConfirmPassword"
    ) {
      setFieldError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (information.password !== information.ConfirmPassword) {
      setPasswordError("Passwords must match.");
      addToast("Passwords must match", { appearance: "error" });
      return;
    }
    if (
      information.name === "" ||
      information.email === "" ||
      information.password === ""
    ) {
      setFieldError("Fields cannot be empty");
      addToast("Fields cannot be empty", { appearance: "error" });
      return;
    }

    // Store user data in local storage
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

    addToast("Signup Successful", { appearance: "success" });

    setInformation({
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
      agree: false,
    });
    navigate("/home");
  };

  return (
    <div className="loginsignup">
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
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={information.email}
            onChange={handleInputChange}
          />
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
          {passwordError && <p className="error">{passwordError}</p>}
          {fieldError && <p className="error">{fieldError}</p>}
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
    </div>
  );
};

export default LoginSignup;
