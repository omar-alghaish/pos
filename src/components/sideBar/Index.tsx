import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SideBarContent from "./components/SideBarContent";
import { useTheme } from "../../hooks/useTheme";
import Button from "../common/button/Index";
import { LOCALES } from "../../i18n";
import i18n from "../../i18n/i18n";
import { IoIosArrowBack } from "react-icons/io";
import IconButton from "../common/iconButton/Index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setActiveModal } from "../../features/modal/modalSlice";

interface SideBarContainerProps {
  barOpen: boolean;
  onClose: () => void;
}

const SideBarContainer: React.FC<SideBarContainerProps> = ({
  barOpen,
  onClose,
}) => {
  const { modal } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [locale, setLocale] = useState(i18n.language);
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLocale(lang);
  };

  const toggleBar = () => {
    modal.activeModal === "sideBar"
      ? dispatch(setActiveModal(""))
      : dispatch(setActiveModal("sideBar"));
  };

  useEffect(() => {
    const isRTL = locale === LOCALES.ARABIC;

    if (modal.activeModal === "sideBar") {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          duration: 0.2,
          opacity: 1,
          display: "block",
          ease: "power3.out",
          onComplete: () => {
            gsap.fromTo(
              sidebarRef.current,
              // For RTL, animate from the right, otherwise animate from the left
              { x: isRTL ? "100%" : "-100%" },
              { duration: 0.2, x: 0, ease: "power3.out" }
            );
          },
        }
      );
    } else {
      gsap.to(sidebarRef.current, {
        duration: 0.2,
        x: isRTL ? "100%" : "-100%",
        ease: "power3.in",
        onComplete: () => {
          gsap.to(containerRef.current, {
            duration: 0.2,
            opacity: 0,
            display: "none",
            ease: "power3.in",
          });
        },
      });
    }
  }, [modal.activeModal, locale]);

  return (
    <div
      ref={containerRef}
      className={`side_bar_container ${
        modal.activeModal === "sideBar" ? "open" : ""
      }`}
      onClick={(e) => {
        if (e.target === containerRef.current) {
          toggleBar();
        }
      }}
    >
      <div
        ref={sidebarRef}
        className={`side_bar_content ${
          modal.activeModal === "sideBar" ? "open" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          style={{ position: "absolute", top: "8px", left: "5px" }}
          onClick={toggleBar}
          icon={<IoIosArrowBack />}
        />
        <SideBarContent />
        {/* <Button onClick={toggleTheme}>
          {theme === "light" ? "dark" : "light"} mode
        </Button> */}
        <Button
          onClick={() => {
            locale === LOCALES.ENGLISH
              ? handleLanguageChange(LOCALES.ARABIC)
              : handleLanguageChange(LOCALES.ENGLISH);
            window.location.reload();
          }}
        >
          {locale === LOCALES.ENGLISH ? "ar" : "en"}
        </Button>
      </div>
    </div>
  );
};

export default SideBarContainer;
