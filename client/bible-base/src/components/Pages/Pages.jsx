//TODO Add Functionality

import React from "react";
import pagesImage from "../../assets/images/pages.png";
import "./pagesStyle.css";

const Pages = () => {
  return (
    <div className="page-container">
      <img src={pagesImage} alt="Pages" className="page-image" />
      <p className="page-text">Sample Text</p> {/*Eventually needs text limit*/}
    </div>
  );
};

export default Pages;
