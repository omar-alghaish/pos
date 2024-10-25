import React from "react";
import SideBarLinkItem from "./SideBarLinkItem";
import Button from "../../common/button/Index";
import { useDispatch } from "react-redux";
import {
  setActiveModal,
  setActivePage,
} from "../../../features/modal/modalSlice";

interface SideBarSectionProps {
  title: string;
  links: any[];
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  arrowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const SideBarSection: React.FC<SideBarSectionProps> = ({
  title,
  links,
  expandedIndex,
  setExpandedIndex,
  arrowRefs,
}) => {
  const dispatch = useDispatch();
  const handleLinkClick = (state: string) => {
    dispatch(setActivePage(state));
    dispatch(setActiveModal(""));
  };
  return (
    <ul className="parent_links_list">
      <div className="title">{title}</div>
      {links.map((link, linkIndex) => (
        <SideBarLinkItem
          key={linkIndex}
          link={link}
          linkIndex={linkIndex}
          expandedIndex={expandedIndex}
          setExpandedIndex={setExpandedIndex}
          arrowRefs={arrowRefs}
          onClick={() => handleLinkClick(link.state)}
        />
      ))}
    </ul>
  );
};

export default SideBarSection;
