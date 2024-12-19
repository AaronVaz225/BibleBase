//nav bar should have About link, Logo Image, Title, And sign out/in button
//TODO, about and signout buttons currently do nothing

import React from "react";
import logoImage from "../../assets/images/logo.png";
import "./navBarStyle.css";

const NavBar = () => {
  return (
    <div className="navBar-container">
      <div className="about">About</div>
      <div className="centered-content">
        <img src={logoImage} alt="Logo" className="logo-image" />
        <h1 className="title">BibleBase</h1>
      </div>
      <button type="button" className="button">
        Sign Out
      </button>
    </div>
  );
};

export default NavBar;
