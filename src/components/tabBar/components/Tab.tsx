// Tab.tsx
import React from "react";
import Button from "../../common/button/Index";

interface TabProps {
  id: string;
  label: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>, id: string) => void; // Updated type here
}

const Tab: React.FC<TabProps> = ({
  id,
  label,
  isActive,
  onSelect,
  onDragStart,
}) => {
  return (
    <Button
      className={`tab ${isActive ? "active" : ""}`}
      draggable
      onClick={() => onSelect(id)}
      onDragStart={(event) => onDragStart(event, id)}
      variant={isActive ? "contained" : "text"}
    >
      {label}
    </Button>
  );
};

export default Tab;
