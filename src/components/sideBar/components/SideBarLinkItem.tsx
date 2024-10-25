import React from "react";
import { Link } from "react-router-dom";
import Button from "../../common/button/Index";
import { RiArrowDownWideLine } from "react-icons/ri";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface LinkChild {
  path: string;
  title: string;
}

interface LinkItem {
  path: string;
  title: string;
  icon?: React.ReactNode;
  children?: LinkChild[];
  state: string;
}

interface SideBarLinkItemProps {
  link: LinkItem;
  linkIndex: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  arrowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onClick: () => void;
}

const SideBarLinkItem: React.FC<SideBarLinkItemProps> = ({
  link,
  linkIndex,
  expandedIndex,
  setExpandedIndex,
  arrowRefs,
  onClick
}) => {
  const { modal } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const toggleChildren = (index: number) => {
    if (expandedIndex === index) {
      // Collapse the current children
      gsap.to(`.child_links_list_${index}`, {
        duration: 0.4,
        height: 0,
        ease: "power2.in",
        onComplete: () => setExpandedIndex(null),
      });
      gsap.to(arrowRefs.current[index], {
        duration: 0.4,
        rotation: 0,
        ease: "power2.inOut",
      });
    } else {
      // Collapse the previous children if any
      if (expandedIndex !== null && arrowRefs.current[expandedIndex]) {
        gsap.to(arrowRefs.current[expandedIndex], {
          duration: 0.4,
          rotation: 0,
          ease: "power2.inOut",
        });
      }

      // Expand the new children
      gsap.fromTo(
        `.child_links_list_${index}`,
        { height: 0 },
        {
          duration: 0.4,
          height: "auto",
          ease: "power2.out",
        }
      );
      setExpandedIndex(index);
      // Rotate arrow for the expanded item
      gsap.to(arrowRefs.current[index], {
        duration: 0.4,
        rotation: 180,
        ease: "power2.inOut",
      });
    }
  };

  // Handle click for parent link
  const handleParentClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default link behavior
    if (link.children) {
      toggleChildren(linkIndex); // Toggle children if available
    } else {
      onClick(); // Call onClick to navigate if no children
    }
  };

  return (
    <li>
      <Button
        variant="text"
        className={`${expandedIndex === linkIndex || modal.activePage === link.state ? "active" : ""}`}
        onClick={handleParentClick} // Use the new handler
      >
        <Link to={!link.children ? link.path : "#"}> {/* Use '#' to prevent navigation if there are children */}
          {link.icon}
          {link.title}
        </Link>
        {link.children ? (
          <div
            ref={(el) => (arrowRefs.current[linkIndex] = el)}
            style={{ display: "inline-block" }}
          >
            <RiArrowDownWideLine />
          </div>
        ) : null}
      </Button>
      {link.children ? (
        <ul
          className={`child_links_list child_links_list_${linkIndex}`}
          style={{
            height: expandedIndex === linkIndex ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          {link.children.map((childLink: LinkChild, childIndex) => (
            <Button key={childIndex} variant="text">
              <Link to={childLink.path} onClick={onClick}> {/* Navigate when clicking child links */}
                <div
                  className="color"
                  style={{
                    backgroundColor: [
                      "#ff6b6b",
                      "#feca57",
                      "#1dd1a1",
                      "#5f27cd",
                      "#54a0ff",
                      "#ff9ff3",
                    ][childIndex % 6],
                  }}
                ></div>
                {childLink.title}
              </Link>
            </Button>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default SideBarLinkItem;
