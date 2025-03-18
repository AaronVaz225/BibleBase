//Layout for Protected routes
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [userInfo, setUserInfo] = useState(null);

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
    //getAllNotes(); will have to be here to
    return () => {}; //clean up function currently doing nothing
  }, []); //I believe the [] makes it run every time the component is updated?

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userInfo={userInfo} />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
