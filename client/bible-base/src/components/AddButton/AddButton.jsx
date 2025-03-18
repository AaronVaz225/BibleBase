import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const AddButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookshelfId, bookId } = useParams();
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [creating, setCreating] = useState(null); // "bookshelf", "book", or "page"

  // Reorder the logic: check for bookId first, then bookshelfId
  let addOptions = [];
  if (bookId) {
    // Inside a Book: Can only add Pages
    addOptions = [{ label: "Add Page", type: "page" }];
  } else if (bookshelfId) {
    // Inside a Bookshelf: Can add Books or Pages
    addOptions = [
      { label: "Add Book", type: "book" },
      { label: "Add Page", type: "page" },
    ];
  } else {
    // At the top level: Can only add Bookshelves
    addOptions = [{ label: "Add Bookshelf", type: "bookshelf" }];
  }

  // Handle adding new item (Bookshelf, Book, or Page)
  const handleCreate = async () => {
    if (!inputValue.trim()) return;

    try {
      if (creating === "bookshelf") {
        await axiosInstance.post("/bookshelves", { name: inputValue });
      } else if (creating === "book" && bookshelfId) {
        await axiosInstance.post("/books", { name: inputValue, bookshelfId });
      } else if (creating === "page") {
        if (bookId) {
          await axiosInstance.post("/pages", { title: inputValue, bookId });
        } else if (bookshelfId) {
          await axiosInstance.post("/pages", {
            title: inputValue,
            bookshelfId,
          });
        }
      }

      setInputValue("");
      setCreating(null);
      setShowOptions(false);
      navigate(0); // Reload to reflect new additions
    } catch (error) {
      console.error("Error creating:", error);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      {/* Add Button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        +
      </button>

      {/* Dropdown Options */}
      {showOptions && !creating && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-2">
          {addOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setCreating(option.type)}
              className="block w-full px-4 py-2 text-center bg-gray-200 text-black rounded-md shadow-md hover:bg-gray-300 transition mb-2"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      {creating && (
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
          <input
            type="text"
            placeholder={`Enter ${creating} name`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border p-2 rounded-md w-64 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
            >
              Create
            </button>
            <button
              onClick={() => {
                setCreating(null);
                setInputValue("");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddButton;
