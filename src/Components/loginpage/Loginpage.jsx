import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import "./Loginpage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Loginpage = () => {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.name === "" || data.email === "" || data.password === "") {
      setFieldError("Fields cannot be empty");
      addToast("Fields cannot be empty", { appearance: "error" });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (
        user.name === data.name &&
        user.email === data.email &&
        user.password === data.password
      ) {
        addToast("Login Successful", { appearance: "success" });
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
        setPasswordError("Invalid credentials");
        addToast("Invalid credentials", { appearance: "error" });
      }
    } else {
      setPasswordError("User does not exist");
      addToast("User does not exist", { appearance: "error" });
    }
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div className="logindetails">
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
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            value={data.email}
            onChange={handleInputChange}
          />
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
          {passwordError && <p className="error">{passwordError}</p>}
          {fieldError && <p className="error">{fieldError}</p>}
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
