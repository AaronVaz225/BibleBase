import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return <Outlet />;
  {
    /*Outlet will render different child components based off of the path (child components in the App.jsx) */
  }
};

export default Layout;
