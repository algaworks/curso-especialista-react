import React from "react";
import ReactDOM from "react-dom";
import "./core/imports.css";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./core/globalStyles";
import App from "./app";
import { Provider } from "react-redux";
import store from "./core/store";
import "./auth/httpConfig";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
