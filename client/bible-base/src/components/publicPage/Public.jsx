// Public facing page
import React from "react";
import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome to Bible Base
        </h1>
      </header>
      <main className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <p className="text-lg mb-4">
          A place to study and take notes on the Bible
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </main>
      <footer className="mt-6 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Bible Base</p>
      </footer>{" "}
    </section>
  );
};

export default Public;
