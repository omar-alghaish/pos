
import React, { useState, useRef, useEffect } from "react";
import Avatar from "../common/avatar/Index";
import { gsap } from "gsap";
import Button from "../common/button/Index";
import { BsList } from "react-icons/bs";
import IconButton from "../common/iconButton/Index";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal } from "../../features/modal/modalSlice";
import { RootState } from "../../app/store";
import Search from "../common/searchBar/Index";
import LanguageSelector from "../common/languageSelector";
interface HeaderProps {
  searchBar?: boolean;
}
const Header: React.FC<HeaderProps> = ({ searchBar = false }) => {
  const modal = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleBar = () => {
    modal.activeModal === "sideBar"
      ? dispatch(setActiveModal(""))
      : dispatch(setActiveModal("sideBar"));
  };

  useEffect(() => {
    if (isOpen) {
      if (dropdownRef.current) {
        dropdownRef.current.style.visibility = "visible"; // Show before animation
        gsap.fromTo(
          dropdownRef.current,
          {
            height: 0,
            opacity: 0,
          },
          {
            duration: 0.3,
            height: "auto",
            opacity: 1,
            ease: "power2.out",
          }
        );
      }
      document.addEventListener("mousedown", handleClickOutside);
      // document.body.classList.add('blurred'); // Add blur effect to body
    } else {
      if (dropdownRef.current) {
        gsap.to(dropdownRef.current, {
          duration: 0.3,
          height: 0,
          opacity: 0,
          ease: "power2.out",
          onComplete: () => {
            dropdownRef.current!.style.visibility = "hidden"; // Hide after animation
          },
        });
      }
      document.removeEventListener("mousedown", handleClickOutside);
      // document.body.classList.remove('blurred'); // Remove blur effect from body
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      avatarRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className="header_container">
      <IconButton
        size="25px"
        variant="circle"
        aria-label="open sidebar"
        icon={modal.activeModal === "sideBar" ? <BsList /> : <BsList />}
        className="toggle"
        onClick={toggleBar}
      ></IconButton>
      <div className="search_component">{searchBar && <Search />}</div>

      <LanguageSelector />

      <div className={`header ${isOpen ? "blurred" : ""}`}>
        <div ref={avatarRef}>
          <Avatar
            src="https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d"
            size="45px"
            initials="AB"
            backgroundColor="#007bff"
            // variant="outlined"
            onClick={toggleDropdown} // Make Avatar clickable
          />
        </div>
        <div
          className="dropdown"
          ref={dropdownRef}
          style={{
            height: "auto",
            opacity: 0,
            visibility: "hidden",
            overflow: "hidden",
          }} // Control visibility through style
        >
          <ul>
            <Button variant="text">Profile</Button>
            <Button variant="text">Settings</Button>
            <Button variant="text">Logout</Button>
          </ul>
        </div>
      </div>
      <div className={`background ${isOpen ? "blurred" : ""}`}></div>
    </div>
  );
};

export default Header;
