import React from "react";
import "./libraryContainer.css";
import Bookshelves from "../Bookshelves/Bookshelves";
import Books from "../Books/Books";
import Pages from "../Pages/Pages";

function LibraryContainer() {
  return (
    <div className="library-container">
      <Pages />
      <Books />
      <Bookshelves />
      <Pages />
      <Books />
      <Bookshelves />
      <Pages />
      <Books />
      <Bookshelves />
      <Pages />
      <Books />
      <Bookshelves />
    </div>
  );
}

export default LibraryContainer;
