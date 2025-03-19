import React from "react";
import { NavLink } from "react-router-dom";

const SwitchTabs = () => {
  return (
    <div className="flex justify-center my-4">
      {/* LIBRARY TAB */}
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 bg-blue-500 text-white rounded-l-md"
            : "px-4 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300"
        }
      >
        Library
      </NavLink>

      {/* BIBLE TAB */}
      <NavLink
        to="/dashboard/bible"
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 bg-blue-500 text-white rounded-r-md"
            : "px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300"
        }
      >
        Bible
      </NavLink>
    </div>
  );
};

export default SwitchTabs;
