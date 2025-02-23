//Welcome page after user signs in
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";

const Welcome = () => {
  const content = (
    <section className="welcome ">
      <Navbar />
      <h1 className="font-bold text-purple-500">Library</h1>

      <p>
        <Link to="/dashboard/bookshelf">Bookshelf</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
