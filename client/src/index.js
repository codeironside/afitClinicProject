import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Login } from "./Pages/Login";
import { Blog } from "./Components/blog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} exact />

      <Route path="/Login" element={<Login />} />
      <Route path="#Blog" element={<Blog />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
