import React, { ChangeEvent, ReactNode } from "react";
import Typography from "../typography/Index";

type InputVariant = "outlined" | "filled" | "standard";

interface InputProps {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  placeholder?: string;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  prefix?: ReactNode; // Add prefix prop
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  variant = "outlined", // default variant
  placeholder = "",
  fullWidth = false,
  error = false,
  helperText = "",
  type = "text",
  prefix, // Destructure the new prefix prop
}) => {
  return (
    <div className={`input-container ${variant} ${fullWidth ? "fullWidth" : ""}`}>
      {label && (
        <label className={`label ${error ? "error" : ""}`}>
          <Typography variant="body2">{label}</Typography>
        </label>
      )}
      <div className={`input-wrapper ${error ? "error" : ""}`}> {/* Wrapper for prefix and input */}
        {prefix && <span className="input-prefix">{prefix}</span>} {/* Render prefix */}
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
