import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { FaFileAlt } from "react-icons/fa";
import AddButton from "../AddButton/AddButton";
import BackButton from "../BackButton/BackButton"; // Import BackButton

const BookView = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/pages/book/${bookId}`)
      .then((res) => setPages(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading)
    return <p className="text-center text-gray-500">Loading pages...</p>;

  return (
    <div className="p-6">
      <BackButton />

      <h2 className="text-2xl font-bold text-center">Pages in Book</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div
              key={page._id}
              className="flex flex-col items-center cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
              onClick={() => navigate(`/dashboard/page/${page._id}`)}
            >
              <FaFileAlt className="text-6xl text-gray-500" />
              <span className="mt-2 text-lg font-semibold">{page.title}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No pages found in this book.
          </p>
        )}
      </div>
      <AddButton />
    </div>
  );
};

export default BookView;
