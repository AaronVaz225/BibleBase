import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFolder, FaTrash } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance";

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {bookshelves.length > 0 ? (
        bookshelves.map((shelf) => (
          <div
            key={shelf._id}
            className="relative flex flex-col items-center cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white"
            onClick={() => navigate(`/dashboard/bookshelf/${shelf._id}`)}
          >
            <FaFolder className="text-6xl text-yellow-500" />
            <span className="mt-2 text-lg font-semibold">{shelf.name}</span>
            <button
              onClick={(e) => handleDelete(shelf._id, e)}
              className="absolute top-1 right-1 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No bookshelves found
        </p>
      )}
    </div>
  );
};

export default Bookshelf;
