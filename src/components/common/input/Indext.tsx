import React, { ChangeEvent, ReactNode } from "react";
import Typography from "../typography/Index";

type InputVariant = "outlined" | "filled" | "standard" | "circle";

type InputProps = 
// InputHTMLAttributes<HTMLInputElement> &
 {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  placeholder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  prefix?: ReactNode; // Correct type definition for prefix
};

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  variant = "outlined",
  placeholder = "",
  fullWidth = false,
  error = false,
  helperText = "",
  type = "text",
  prefix,
  ...props
}) => {
  return (
    <div className={`input-container ${variant} ${fullWidth ? "fullWidth" : ""}`} {...props}>
      {label && (
        <label className={`label ${error ? "error" : ""}`}>
          <Typography variant="body2">{label}</Typography>
        </label>
      )}
      <div className={`input-wrapper ${error ? "error" : ""}`}>
        {prefix && <span className="input-prefix">{prefix}</span>}
        <input
          className={`input-field ${variant} ${error ? "error" : ""}`}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      {helperText && <p className={`helper-text ${error ? "error" : ""}`}>{helperText}</p>}
    </div>
  );
};

export default Input;
