//TODO Add Functionality

import React from "react";
import booksImage from "../../assets/images/books.png";
import "./booksStyle.css";

function Books() {
  return (
    <div className="book-container">
      <img src={booksImage} alt="Book" className="book-image" />
      <p className="book-text">Sample Text</p> {/*Eventually needs text limit*/}
    </div>
  );
}

export default Books;
