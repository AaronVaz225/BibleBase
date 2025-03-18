//Welcome page after user signs in
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar/Navbar";
import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import { useEffect } from "react";

const Welcome = () => {
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
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  const content = (
    <section className="welcome ">
      <Navbar userInfo={userInfo} />
      <h1 className="font-bold text-purple-500">Library</h1>

      <p>
        <Link to="/dashboard/bookshelf">Bookshelf</Link>
      </p>
    </section>
  );

  useEffect(() => {
    getUserInfo();
    //getAllNotes(); will have to be here to
    return () => {}; //clean up function currently doing nothing
  }, []); //I believe the [] makes it run every time the component is updated?

  return content;
};

export default Welcome;
