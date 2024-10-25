import React, { useState, useRef, useEffect } from "react";
// import styles from './DropdownMenu.module.scss';
import { gsap } from "gsap";
import { IoMdArrowDropdown } from "react-icons/io";
import Button from "../button/Index";

interface DropdownMenuProps {
  buttonLabel: string;
  className?: string;
  items: string[];
  onSelect: (item: string) => void;
  value?: any
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  buttonLabel,
  items,
  onSelect,
  className,
  value
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Animation with GSAP
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
        ease: "power1.out",
      });
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
        ease: "power1.in",
      });
    }
  }, [isOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={`dropdown ${className}`}>
      <Button
        color="secondary"
        onClick={toggleDropdown}
        className="dropdown__button"
      >
        {buttonLabel} <IoMdArrowDropdown />
      </Button>
      <ul ref={menuRef} className={`dropdown__menu ${isOpen ? "active" : ""}`}>
        {items.map((item, index) => (
          <Button key={index} onClick={() => onSelect(item)} className={`${item == value && 'selected'}`}>
            {item}
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
