// src/components/Book/Book.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { FaFolder, FaFileAlt, FaTrash } from "react-icons/fa";
import AddButton from "../AddButton/AddButton";
import BackButton from "../BackButton/BackButton"; // Import BackButton

const Book = () => {
  const { bookshelfId } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState([]);

  const fetchData = () => {
    axiosInstance
      .get(`/books/bookshelf/${bookshelfId}`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
    axiosInstance
      .get(`/pages/bookshelf/${bookshelfId}`)
      .then((res) => setPages(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, [bookshelfId]);

  const handleDeleteBook = async (bookId, e) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/books/${bookId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleDeletePage = async (pageId, e) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/pages/${pageId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <BackButton />

      <h2 className="text-2xl font-bold text-center">Books & Pages</h2>

      {/* Books Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="relative flex flex-col items-center cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
              onClick={() => navigate(`/dashboard/book/${book._id}`)}
            >
              <FaFolder className="text-6xl text-blue-500" />
              <span className="mt-2 text-lg font-semibold">{book.name}</span>
              <button
                onClick={(e) => handleDeleteBook(book._id, e)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No books found.</p>
        )}
      </div>

      {/* Pages Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div
              key={page._id}
              className="relative flex flex-col items-center cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
              onClick={() => navigate(`/dashboard/page/${page._id}`)}
            >
              <FaFileAlt className="text-6xl text-gray-500" />
              <span className="mt-2 text-lg font-semibold">{page.title}</span>
              <button
                onClick={(e) => handleDeletePage(page._id, e)}
                className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No pages found.</p>
        )}
      </div>

      {/* Add Button */}
      <AddButton />
    </div>
  );
};

export default Book;
