// CheckboxGroupField.tsx
import React from "react";
import { Checkbox } from "antd";
import Typography from "../../../components/common/typography/Index";

interface CheckboxGroupFieldProps {
  label: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroupField: React.FC<CheckboxGroupFieldProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="checkbox-group-field">
      <Typography variant="h5">{label}</Typography>
      <Checkbox.Group
        options={options}
        value={selectedValues}
        onChange={(checkedValues) => onChange(checkedValues as string[])}
      />
    </div>
  );
};

export default CheckboxGroupField;
