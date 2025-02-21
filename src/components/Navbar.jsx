import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="sidebar">
      <h1>Data Pipeline Manager</h1>
      <ul>
        <li><Link to="/" activeclassname="active">Dashboard</Link></li>
        <li><Link to="/create" activeclassname="active">Create New Pipeline</Link></li>
        <li><Link to="/configurations" activeclassname="active">
            Configurations
          </Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
