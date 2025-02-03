//Public facing page
import React from "react";
import { Link } from "react-router-dom";
import "./public.css";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>Welcome to Bible Base</h1>
      </header>
      <main className="public__main">
        <Link to="/login">Login</Link>
        <br />
        <Link to="/sign-up">Sign Up</Link>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </section>
  );
  return content;
};

export default Public;
