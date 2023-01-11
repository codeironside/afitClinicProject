import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import "../styles/navbar.scss";

export const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  return (
    <nav className="navbar">
      <h3 className="logo"> Logo</h3>
      <ul
        className={Mobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setMobile(false)}
      >
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/Login">
          <li>Login</li>
        </Link>
        <Link to="#Blog">
          <li>Blog</li>
        </Link>
        <Link to="#Blog">
          <li>Contact</li>
        </Link>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
        {Mobile ? <ImCross /> : <FaBars />}
      </button>
    </nav>
  );
};
