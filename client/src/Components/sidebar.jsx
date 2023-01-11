import React, { useState } from "react";
import { FaTh, FaUserAlt, FaRegChartBar, FaBars } from "react-icons/fa";
import "../styles/sidebar.scss";
import { NavLink } from "react-router-dom";
export const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Dashboard",
      name: " Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/Register",
      name: "Patient Registration",
      icon: <FaUserAlt />,
    },
    {
      path: "/PActive",
      name: " Patients Activity",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <main className="container">
      <section style={{ width: isOpen ? "400px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </section>
      <main className="main">{children}</main>
    </main>
  );
};
