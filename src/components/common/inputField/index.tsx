import React, { InputHTMLAttributes } from "react";
import { Input } from "antd";
import Typography from "../../../components/common/typography/Index";

type IInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  name?: string;
};

const InputField: React.FC<IInputFieldProps> = ({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  name,
}) => {
  return (
    <div className="input_item" style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start", width: '100%' }}>
      <Typography>{label}</Typography>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {error && <div className="error_message">{error}</div>}
    </div>
  );
};

export default InputField;
