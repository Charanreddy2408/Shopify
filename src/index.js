// src/index.js

import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Shopcontextprovider from "./context/Shopcontext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Shopcontextprovider>
      <App />
      <ToastContainer /> 
    </Shopcontextprovider>
  </React.StrictMode>
);

reportWebVitals();
