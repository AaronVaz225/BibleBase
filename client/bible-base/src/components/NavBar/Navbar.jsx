//NavBar component
import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../public/BibleBaseNoBg.png";

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-[#d9dcd6] flex items-center justify-between pl-2 pr-5 py-2 drop-shadow border-b">
      <div className="flex  ">
        <img src={Logo} className="pr-4 max-w-15 min-w-15" />
        <h2 className="text-2xl font-bold text-[#260038] font-[Orbitron] py-2 ">
          BibleBase
        </h2>
      </div>

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
