import React from "react";

interface SideBarHeaderProps {
  title: string;
}

const SideBarHeader: React.FC<SideBarHeaderProps> = ({ title }) => {
  return <div className="header">{title}</div>;
};

export default SideBarHeader;
