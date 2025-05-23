import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Module 2:
// * import BrowserRouter from 'react-router-dom'
// * wrap App components with BrowserRouter

// Module 3:
// * import Provider from 'react-redux'
// * wrap your App + Browser with Redux Provider in src/index.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
