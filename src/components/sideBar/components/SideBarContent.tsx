import React, { useState, useRef } from "react";
import SideBarHeader from "./SideBarHeader";
import SideBarSection from "./SideBarSection";
import Divider from "../../common/divider/Index";
import { Links, otherLinks } from "../../../routes/router";

const SideBarContent: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="main">
      <SideBarHeader title="Alphatek pos" />
      <SideBarSection
        title="menu"
        links={Links}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        arrowRefs={arrowRefs}
      />
      <Divider thickness="2px" />
      <SideBarSection
        title="others"
        links={otherLinks}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        arrowRefs={arrowRefs}
      />
    </div>
  );
};

export default SideBarContent;
