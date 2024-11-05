import React, { useState } from "react";
import {  Space } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import IconButton from "../common/iconButton/Index";

type ViewMode = "grid" | "list";

interface ViewSelectProps {
  onChangeView: (view: ViewMode) => void; // callback to pass selected view mode to parent
}

const ViewSelect: React.FC<ViewSelectProps> = ({ onChangeView }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    onChangeView(mode);
  };

  return (
    <Space>
      <IconButton
        variant={viewMode === "grid" ? "contained" : "text"}
        icon={<AppstoreOutlined />}
        onClick={() => handleViewChange("grid")}
        style={{
          fontSize: "18px",
        }}
      />
      <IconButton
        variant={viewMode === "list" ? "contained" : "text"}
        icon={<UnorderedListOutlined />}
        onClick={() => handleViewChange("list")}
        style={{
          fontSize: "18px",
        }}
      />
    </Space>
  );
};

export default ViewSelect;
