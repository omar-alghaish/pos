// RadioButtonGroup.tsx
import React from "react";
import { Radio } from "antd";

interface RadioButtonGroupProps {
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
}) => {
  return (
    <div className="radio-button-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && <label>{label}</label>}
      <Radio.Group
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ display: "flex", gap: "10px" }}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioButtonGroup;
