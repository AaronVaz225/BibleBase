//TODO Add Functionality

import React from "react";
import bookshelvesImage from "../../assets/images/bookshelves.png";
import "./bookshelvesStyle.css";

function Bookshelves() {
  return (
    <div className="bookshelf-container">
      <img src={bookshelvesImage} alt="Bookshelf" className="bookshelf-image" />
      <p className="bookshelf-text">Sample Text</p>
      {/*Eventually needs text limit*/}
    </div>
  );
}

export default Bookshelves;
