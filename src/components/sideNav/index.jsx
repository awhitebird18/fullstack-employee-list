import React from "react";
import { BsGrid1X2, BsPeopleFill, BsArrowBarLeft } from "react-icons/bs";
import "./index.css";

const SideNav = () => {
  return (
    <nav className="side-nav">
      <div>
        <h1 className="logo">Plexxis</h1>
      </div>
      <ul>
        <li>
          <span>
            <BsGrid1X2 />
          </span>
          <p>Dashboard</p>
        </li>
        <li className="current">
          <span>
            <BsPeopleFill />
          </span>
          <p>Employee List</p>
        </li>
        <li>
          <span>
            <BsArrowBarLeft />
          </span>
          <p>Logout</p>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
