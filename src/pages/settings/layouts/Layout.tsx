import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import SettingsSideBar from "../components/SettingsSideBar";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import { gsap } from "gsap"; // Import GSAP for animations
import IconButton from "../../../components/common/iconButton/Index";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Reference for the sidebar

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      const newState = !prevState; // Toggle the state
      gsap.to(".settings_sidebar_container", { x: newState ? "0" : "-100%", duration: 0.5 }); // Animate based on the new state
      return newState; // Return the new state
    });
  };

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        // Close sidebar only on small screens
        if (window.innerWidth < 768 && sidebarOpen) {
          toggleSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="settings_layout">
      {/* Hamburger Menu Icon Button */}
      <IconButton className="toggle_button" onClick={toggleSidebar} icon={<FaBars />} />

      {/* Sidebar */}
      <div ref={sidebarRef} className={`settings_sidebar_container ${sidebarOpen ? "open" : ""}`}>
        <SettingsSideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content */}
      <div className="settings_outlet">
        <div style={{ paddingBottom: "30px" }}>
          {/* You can add a Header here if you want */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
