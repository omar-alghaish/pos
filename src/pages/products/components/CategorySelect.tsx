import React from "react";
import { Select } from "antd";
import Typography from "../../../components/common/typography/Index";

interface CategorySelectProps {
  selectedValue: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  label: string;
  name:string
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedValue,
  onChange,
  options,
  label,
  name
}) => {
  return (
    <div className="category item">
      <div className="category_input item_input">
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

export default CategorySelect;
