import React from "react";
import { Input } from "antd";
import Typography from "../../../components/common/typography/Index";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="input_item" style={{display:'flex',flexDirection:'column',alignItems:"flex-start", width:'100%'}}>
      <Typography>{label}</Typography>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <div className="error_message">{error}</div>}
    </div>
  );
};

export default InputField;
