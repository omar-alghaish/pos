import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/Index";
import { CgClose } from "react-icons/cg";
import { BsList } from "react-icons/bs";
import IconButton from "../common/iconButton/Index";
import Header from "../header/Index";

const MainLayout = () => {
  const [barOpen, setBarOpen] = useState(false);

  const toggleBar = () => {
    setBarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Disable body scroll when sidebar is open
    if (barOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    // Clean up on component unmount or when barOpen changes
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll
    };
  }, [barOpen]);

  return (
    <div className="main_layout_container">

      {/* <Header barOpen={barOpen} toggleBar={toggleBar}/> */}
      {/* <IconButton size="25px" variant="contained" aria-label="open sidebar" icon={barOpen ? <CgClose /> : <BsList />} className="toggle" onClick={toggleBar}>
        
      </IconButton> */}
      <SideBar barOpen={barOpen} onClose={() => setBarOpen(false)} />
      <Outlet />
    </div>
  );
};

export default MainLayout;
