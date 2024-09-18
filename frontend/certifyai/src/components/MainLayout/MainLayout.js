import React from 'react';
import Sidebar from '../Sidebar/Sidebar'; // Adjust the import path as needed
import { Outlet } from 'react-router-dom'; // For rendering nested routes

const MainLayout = () => {
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            {/* The Outlet component renders the matched nested route */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
