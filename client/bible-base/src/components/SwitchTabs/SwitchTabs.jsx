import React from "react";
import { NavLink } from "react-router-dom";

const SwitchTabs = () => {
  return (
    <div className="flex justify-center my-4 ">
      {/* LIBRARY TAB */}
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          isActive
            ? "px-7 py-3 bg-gradient-to-r from-fuchsia-900 to-blue-900 text-white rounded-l-md font-mono "
            : "px-7 py-3 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 font-mono "
        }
      >
        Library
      </NavLink>

      {/* BIBLE TAB */}
      <NavLink
        to="/dashboard/bible"
        className={({ isActive }) =>
          isActive
            ? "px-7 py-3 bg-gradient-to-r from-blue-900 to-fuchsia-900 text-white rounded-r-md font-mono "
            : "px-7 py-3 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 font-mono"
        }
      >
        Bible
      </NavLink>
    </div>
  );
};

export default SwitchTabs;
