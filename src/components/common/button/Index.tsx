import React, { ButtonHTMLAttributes } from 'react';

// Define available variants for the button
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined' | 'text'; // Define your button variants
  children: React.ReactNode; // title component to be rendered
  size?: string
  color?: 'primary' | 'secondary';
  disabled?: boolean
};

const Button: React.FC<ButtonProps> = ({
  variant = 'text',
  children,
  className = '',
  size,
  color= 'primary',
  disabled,
  ...buttonProps // Collect all other button props
}) => {
  // Determine class name based on variant and include any additional classes
  const buttonClass = `button ${variant} ${className} ${color} ${disabled ? "disabled" : ''}`.trim();

  return (
    <button style={{fontSize: size}} className={buttonClass} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
