import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/@fortawesome/fontawesome-free/js/all.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/swiper/swiper.css";
import "../node_modules/swiper/swiper-bundle.min.mjs";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CartContextProvider from "./context/CartContext";
import FavariteContextProvider from "./context/FavariteContext";
import OrderContextProvider from "./context/OrderContect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <OrderContextProvider>
    <FavariteContextProvider>
      <CartContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CartContextProvider>
    </FavariteContextProvider>
  </OrderContextProvider>
);

reportWebVitals();
