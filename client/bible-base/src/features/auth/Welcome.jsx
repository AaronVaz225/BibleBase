import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import Bookshelf from "../../components/Bookshelf/Bookshelf";
import AddButton from "../../components/AddButton/AddButton";

const Welcome = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const navigate = useNavigate();

  // Callback function to fetch bookshelves
  const getBookshelves = async () => {
    try {
      const response = await axiosInstance.get("/bookshelves");
      setBookshelves(response.data);
    } catch (error) {
      console.error("Error fetching bookshelves:", error);
    }
  };

  useEffect(() => {
    getBookshelves();
  }, []);

  return (
    <section className="welcome p-6">
      <h1 className="text-4xl font-bold text-purple-900 text-center mb-4 font-[Orbitron]">
        Library
      </h1>

      {/* Pass the callback to Bookshelf */}
      <Bookshelf
        bookshelves={bookshelves}
        refreshBookshelves={getBookshelves}
      />

      <AddButton />
    </section>
  );
};

export default Welcome;
