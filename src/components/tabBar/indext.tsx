// TabsBar.tsx
import React, { useState } from "react";
import Tab from "./components/Tab";

interface TabData {
  id: string;
  label: string;
}

const TabsBar: React.FC = () => {
  const [tabs, setTabs] = useState<TabData[]>([
    { id: "1", label: "Tab 1" },
    { id: "2", label: "Tab 2" },
    { id: "3", label: "Tab 3" },
  ]);
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleSelectTab = (id: string) => setActiveTab(id);

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.dataTransfer.setData("tabId", id);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    const draggedId = event.dataTransfer.getData("tabId");
    if (draggedId === targetId) return;

    const newTabs = [...tabs];
    const draggedIndex = newTabs.findIndex((tab) => tab.id === draggedId);
    const targetIndex = newTabs.findIndex((tab) => tab.id === targetId);

    [newTabs[draggedIndex], newTabs[targetIndex]] = [
      newTabs[targetIndex],
      newTabs[draggedIndex],
    ];
    setTabs(newTabs);
  };

  return (
    <div className="tabs-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(event) => handleDrop(event, tab.id)}
        >
          <Tab
            id={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            onSelect={handleSelectTab}
            onDragStart={handleDragStart}
          />
        </div>
      ))}
    </div>
  );
};

export default TabsBar;
