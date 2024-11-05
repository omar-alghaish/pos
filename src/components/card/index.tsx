import React from "react";

type Variant = "elevated" | "outlined" | "filled";

type CardProps = {
  title?: string;
  content?: string;
  imageUrl?: string;
  actions?: React.ReactNode;
  variant?: Variant;
  elevation?: number; // Sets shadow depth for elevated cards
  padding?: string; // Sets custom padding for content
  className?: string; // Allows additional custom styles
  children?: React.ReactNode;
  onClick?: () => void;
  style:any;
};

const Card: React.FC<CardProps> = ({
  title,
  content,
  imageUrl,
  actions,
  variant = "elevated", // Default variant
  elevation = 1, // Default elevation level
  padding = "20px", // Default padding
  className = "",
  children,
  onClick,
  style
}) => {
  return (
    <div
      className={`card ${variant} elevation-${elevation} ${className}`}
      style={{...style, padding }}
      onClick={onClick}
      
    >
      {imageUrl && <img src={imageUrl} alt="Card" className="card-image" />}
      {title && <h3 className="card-title">{title}</h3>}
      {content && <p className="card-content">{content}</p>}
      {children}
      {actions && <div className="card-actions">{actions}</div>}
    </div>
  );
};

export default Card;
