import React, { useRef } from "react";
import SideBarContent from "./components/SideBarContent";
import { IoIosArrowBack } from "react-icons/io";
import IconButton from "../common/iconButton/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setActiveModal } from "../../features/modal/modalSlice";

interface SideBarContainerProps {
  onClose: () => void;
}

const SideBarContainer: React.FC<SideBarContainerProps> = ({}) => {
  const { modal } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleBar = () => {
    modal.activeModal === "sideBar"
      ? dispatch(setActiveModal(""))
      : dispatch(setActiveModal("sideBar"));
  };

  return (
    <div
      ref={sidebarRef}
      className={`side_bar_content`}
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        style={{ position: "absolute", top: "8px", left: "5px" }}
        onClick={toggleBar}
        icon={<IoIosArrowBack />}
      />
      <SideBarContent />
    </div>
  );
};

export default SideBarContainer;
