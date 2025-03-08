
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css"; // Add styles later

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Sidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
