import React, { ButtonHTMLAttributes } from 'react';

// Define available variants for the button
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'contained' | 'outlined' | 'text' | 'circle'; // Define your button variants
  icon: React.ReactNode; // Icon component to be rendered
  size?: string
};

const IconButton: React.FC<IconButtonProps> = ({
  variant = 'text',
  icon,
  className = '',
  size,
  ...buttonProps // Collect all other button props
}) => {
  // Determine class name based on variant and include any additional classes
  const buttonClass = `icon-button ${variant} ${className}`.trim();

  return (
    <button style={{fontSize: size}} className={buttonClass} {...buttonProps}>
      {icon}
    </button>
  );
};

export default IconButton;
