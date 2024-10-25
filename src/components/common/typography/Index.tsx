import React, { ReactNode } from 'react';
import classNames from 'classnames'
interface TypographyProps {
  variant?: 
    | 'h1' 
    | 'h2' 
    | 'h3' 
    | 'h4' 
    | 'h5' 
    | 'h6' 
    | 'subtitle1' 
    | 'subtitle2' 
    | 'body1' 
    | 'body2' 
    | 'caption'
    | 'button'
    | 'overline';
  component?: keyof JSX.IntrinsicElements; // Define which HTML element to render
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default';
  style?: any
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  component,
  children,
  className,
  color = 'default',
  style
}) => {
  const Component = component || 'p'; // Default to paragraph if no component is provided
  
  return (
    <Component style={style} className={classNames(`typography`, `typography--${variant}`, `color-${color}`, className)}>
      {children}
    </Component>
  );
};

export default Typography;
