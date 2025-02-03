//Welcome page after user signs in
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const content = (
    <section className="welcome">
      <h1>Library</h1>

      <p>
        <Link to="/dashboard/bookshelf">Bookshelf</Link>
      </p>
    </section>
  );

  return content;
};

export default Welcome;
