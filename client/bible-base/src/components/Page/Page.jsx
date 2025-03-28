// src/components/Page/Page.jsx
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import BackButton from "../BackButton/BackButton"; // Import BackButton
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axiosInstance.get(`/pages/${pageId}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
    });
  }, [pageId]);

  const handleSave = async () => {
    await axiosInstance.put(`/pages/${pageId}`, { content });
    toast.success("Note Saved!");
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/pages/${pageId}`);
      navigate(-1);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <BackButton />
      <Toaster />

      <h2 className="text-2xl font-bold text-center mb-4 text-purple-900 font-[Orbitron]">
        {title}
      </h2>
      <ReactQuill
        value={content}
        onChange={setContent}
        className="bg-white text-3xl"
      />
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-purple-700 cursor-pointer text-white px-6 py-2 rounded-md shadow hover:bg-purple-900 transition"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white cursor-pointer px-6 py-2 rounded-md shadow hover:bg-red-900 transition"
        >
          Delete
        </button>
      </div>
      {/* No AddButton here */}
    </div>
  );
};

export default Page;
