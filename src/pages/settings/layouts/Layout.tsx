import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SettingsSideBar from "../components/SettingsSideBar";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import IconButton from "../../../components/common/iconButton/Index";
import Drawer from "../../../components/common/drawer";
import DynamicBreadcrumb from "../../../components/common/dynamicBreadcrumb";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle dynamic resizing for small screens
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(isSmallScreen);
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => {
      const newState = !prevState; // Toggle the state

      return newState; // Return the new state
    });
  };

  return (
    <div className="settings_layout">
      {/* Hamburger Menu Icon Button */}
      <IconButton
        className="toggle_button"
        onClick={toggleSidebar}
        icon={<FaBars />}
      />
      {/* <div style={{width:'max-content'}}> */}
      <Drawer
        open={sidebarOpen}
        variant={isSmallScreen ? "temporary" : "persistent"}
        onClose={() => toggleSidebar()}
      >
        <SettingsSideBar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      </Drawer>
      {/* </div> */}

      {/* Main Content */}
      <div className="settings_outlet">
        <div style={{ paddingBottom: "30px" }}></div>
        <DynamicBreadcrumb />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
