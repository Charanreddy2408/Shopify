import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Shopcontextprovider from "./context/Shopcontext";
import { ToastProvider } from "react-toast-notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ToastProvider>
      <Shopcontextprovider>
        <App />
      </Shopcontextprovider>
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();
