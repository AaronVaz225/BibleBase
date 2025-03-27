import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { FaTrash } from "react-icons/fa";
import AddButton from "../AddButton/AddButton";
import BackButton from "../BackButton/BackButton";
import PageIcon from "./page.png";

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

  const handleDeletePage = async (pageId, e) => {
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/pages/${pageId}`);
      // Refresh the page list:
      axiosInstance
        .get(`/pages/book/${bookId}`)
        .then((res) => setPages(res.data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading pages...</p>;

  return (
    <div className="p-6">
      <BackButton />
      <h2 className="text-2xl font-bold font-[Orbitron] text-purple-900 text-center">
        Pages in Book
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 md:mx-10 lg:mx-20 xl:mx-60">
        {pages.length > 0 ? (
          pages.map((page) => (
            <div
              key={page._id}
              className="relative flex flex-col items-center cursor-pointer p-4 border-3 border-b-6 rounded-xl shadow-md hover:shadow-lg bg-gradient-to-r from-fuchsia-50 to-sky-50 transition-all hover:border-r-6 hover:border-l-6"
              onClick={() => navigate(`/dashboard/page/${page._id}`)}
            >
              <img src={PageIcon} className="w-20 h-20" />

              <span className="mt-2 text-lg font-semibold">{page.title}</span>
              <button
                onClick={(e) => handleDeletePage(page._id, e)}
                className="absolute top-1 right-1 tooltip"
                data-tip="Delete"
              >
                <FaTrash className="btn px-1 py-2 text-red-800 hover:text-red-400 " />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No pages found in this book.
          </p>
        )}
      </div>
      <AddButton />
    </div>
  );
};

export default BookView;
