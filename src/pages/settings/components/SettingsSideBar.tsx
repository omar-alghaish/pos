import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {  useRef } from "react";
// import { useTheme } from "../../../hooks/useTheme";
import { Link } from "react-router-dom"; // Import Link for navigation
import { settingsLinks } from "../../../routes/router";
import Button from "../../../components/common/button/Index";
import Typography from "../../../components/common/typography/Index";
import { setActivePage } from "../../../features/modal/modalSlice";

interface SettingsSideBarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const SettingsSideBar: React.FC<SettingsSideBarProps> = ({ toggleSidebar, sidebarOpen }) => {
  const { theme } = useSelector(
    (state: RootState) => state.settings.apperance
  );
  const { modal } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const { theme } = useTheme();



  const handleNavigatePage = (state: string) => {

    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
    if (state) {
      dispatch(setActivePage(state));
    }
  };

  return (
    <div ref={containerRef} className={`settings_sidebar ${theme}`}>
      {settingsLinks.map((link) => (
        <div className="links_container" key={link.state}>
          <Typography variant="subtitle1" className="section_title">
            {link.icon} {link.title}
          </Typography>
          {link.children && (
            <div className="sidebar-children">
              {link.children.map((child) => (
                <Link key={child.state} to={child.path}>
                  <Button
                    onClick={() => handleNavigatePage(child.state)}
                    className={`${
                      modal.activePage === child.state ? "active" : ""
                    }`}
                  >
                    <div className="sidebar-child-item">
                      <span>{child.title}</span>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SettingsSideBar;
