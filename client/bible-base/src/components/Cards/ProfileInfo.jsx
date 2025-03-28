import React from "react";
import { getInitials } from "../../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3 pb-2">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-100 font-medium bg-gradient-to-r from-amber-500 to-pink-500">
        {getInitials(userInfo?.fullName)}
      </div>
      <div>
        <p className=" font-mono  md:text-lg text-xs ">{userInfo?.fullName}</p>
        <button
          className="text-sm text-slate-700 underline cursor-pointer font-mono"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
