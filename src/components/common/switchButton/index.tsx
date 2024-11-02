// components/common/SwitchButton.tsx
import React from "react";
import { Switch } from "antd";

interface SwitchButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  error,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div style={{ display: "flex",flexDirection:'column',  gap: "8px" }}>
        {label && <label>{label}</label>}
        <Switch style={{width:'max-content'}} checked={checked} onChange={onChange} disabled={disabled} />
      </div>
      {error && (
        <span style={{ color: "red", fontSize: "12px" }}>{error}</span>
      )}
    </div>
  );
};

export default SwitchButton;
