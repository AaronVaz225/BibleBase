import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance";

import Icon from "./Bookshelf.png";

const Bookshelf = ({ bookshelves, refreshBookshelves }) => {
  const navigate = useNavigate();

  const handleDelete = async (shelfId, e) => {
    // Prevent the click from triggering the navigation
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/bookshelves/${shelfId}`);
      // Call the callback to refresh the bookshelf list
      refreshBookshelves();
    } catch (error) {
      console.error("Error deleting bookshelf:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mx-5 md:mx-10 lg:mx-20 xl:mx-60 ">
      {bookshelves.length > 0 ? (
        bookshelves.map((shelf) => (
          <div
            key={shelf._id}
            className="relative flex flex-col items-center cursor-pointer p-4 border-3 border-b-6 rounded-xl bg-gradient-to-r from-fuchsia-50 to-sky-50 transition-all hover:border-r-6 hover:border-l-6 "
            onClick={() => navigate(`/dashboard/bookshelf/${shelf._id}`)}
          >
            <img src={Icon} className=" w-20 h-20 " />

            <span className="mt-2 text-lg font-mono font-extrabold ">
              {shelf.name}
            </span>
            <button
              onClick={(e) => handleDelete(shelf._id, e)}
              className="absolute top-1 right-1 tooltip"
              data-tip="Delete"
            >
              <FaTrash className="btn px-1 py-2 text-red-800 hover:text-red-400" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Press the "+" button to get started.
        </p>
      )}
    </div>
  );
};

export default Bookshelf;
