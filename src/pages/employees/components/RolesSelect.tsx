import React from "react";
import { Select } from "antd";
import Typography from "../../../components/common/typography/Index";

interface RolesSelectProps {
  selectedValue: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  label: string;
}

const RolesSelect: React.FC<RolesSelectProps> = ({
  selectedValue,
  onChange,
  options,
  label,
  
}) => {
  return (
    <div className="roles item">
      <div className="roles_input item_input">
        <Typography>{label}</Typography>
        <Select
          style={{ width: "100%" }}
          placeholder={`Select a ${label.toLowerCase()}`}
          value={selectedValue}
          onChange={onChange}
          options={options}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          // name={name}
        />
      </div>
    </div>
  );
};

export default RolesSelect;
