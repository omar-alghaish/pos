import React from 'react';

interface AvatarProps {
  onClick: () => void; // Corrected the type here
  size?: string; // Avatar size
  src?: string; // Image source
  alt?: string; // Alt text for the image
  initials?: string; // Initials to display if no image is provided
  backgroundColor?: string; // Background color for initials
  variant?: 'default' | 'rounded' | 'outlined' | 'circle'; // Variants for the avatar
}

const Avatar: React.FC<AvatarProps> = ({
  size = '40px',
  src,
  alt = 'User Avatar',
  initials,
  backgroundColor = '#f0f0f0', // Default background color
  variant = 'default', // Default variant
  onClick,
}) => {
  return (
    <div
      className={`avatar avatar--${variant}`}
      style={{
        width: size,
        height: size,
        backgroundColor: src ? 'transparent' : backgroundColor,
      }}
      onClick={onClick} // Corrected the onClick reference here
    >
      {src ? (
        <img className="avatar__image" src={src} alt={alt} />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
