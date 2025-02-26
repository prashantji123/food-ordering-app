import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <img className="logo" src={assets.logo} alt="" />
        <img className="admin" src={assets.user} alt="" />
      </div>
      <img className="profile" src={assets.profile_pic} alt="" />
    </div>
  );
};

export default Navbar;
