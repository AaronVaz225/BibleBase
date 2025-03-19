// src/components/BackButton/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center p-2 text-gray-600 hover:text-gray-800"
    >
      <FaArrowLeft className="mr-2" />
      Back
    </button>
  );
};

export default BackButton;
