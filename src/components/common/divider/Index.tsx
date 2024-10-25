import React from 'react';

interface DividerProps {
  variant?: 'horizontal' | 'vertical';
  thickness?: string;
  color?: 'secondary' | 'primary';
  margin?: string;
}

const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  thickness = '1px',
  color,
  margin = '16px 0',
}) => {
  return (
    <div
      className={`divider ${variant} ${color}`}
      style={{
        
        height: variant === 'horizontal' ? thickness : '100%',
        width: variant === 'horizontal' ? '100%' : thickness,
        margin: variant === 'horizontal' ? margin : `0 ${margin}`,
      }}
    />
  );
};

export default Divider;
