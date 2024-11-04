import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../sideBar/Index";
import LoadingPage from "../loadingPage/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Drawer from "../common/drawer";
import { setActiveModal } from "../../features/modal/modalSlice";

const MainLayout = () => {
  const { modal } = useSelector((state: RootState) => state);
  const [barOpen, setBarOpen] = useState(false);
  const { globalLoadingStatus } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const dispatch = useDispatch();

  const toggleBar = () => {
    modal.activeModal === "sideBar"
      ? dispatch(setActiveModal(""))
      : dispatch(setActiveModal("sideBar"));
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
  console.log(globalLoadingStatus);
  return (
    <div className="main_layout_container">
      {<LoadingPage variant={"linear"} isopen={globalLoadingStatus} />}
      <Drawer
        open={modal.activeModal === "sideBar" ? true : false}
        onClose={() => toggleBar()}
        variant="temporary"
        direction="left"
        width="300px"
      >
        <SideBar onClose={() => setBarOpen(false)} />
      </Drawer>
      <Outlet />
    </div>
  );
};

export default MainLayout;
