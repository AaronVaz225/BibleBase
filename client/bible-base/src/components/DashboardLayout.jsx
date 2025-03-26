// src/layout/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import SwitchTabs from "../components/SwitchTabs/SwitchTabs";

const DashboardLayout = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f2f1]">
      <Navbar userInfo={userInfo} />

      {/* Library / Bible switch */}
      <SwitchTabs />

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
