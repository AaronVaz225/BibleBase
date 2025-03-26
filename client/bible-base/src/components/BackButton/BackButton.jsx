// src/components/BackButton/BackButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center p-2 text-gray-600 hover:text-gray-800 font-mono text-md"
    >
      <IoArrowBackCircle className="mr-2 w-7 h-7" />
      Back
    </button>
  );
};

export default BackButton;
