import React from "react";
import { BsGrid1X2, BsPeopleFill, BsArrowBarLeft } from "react-icons/bs";
import "./index.css";

const SideNav = () => {
  return (
    <nav className="side-nav">
      <div className="logo">Plexxis</div>
      <ul>
        <li>
          <span>
            <BsGrid1X2 />
          </span>
          Dashboard
        </li>
        <li className="current">
          <span>
            <BsPeopleFill />
          </span>
          Employee List
        </li>
        <li>
          <span>
            <BsArrowBarLeft />
          </span>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
