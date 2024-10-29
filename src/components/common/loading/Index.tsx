// src/components/Loading.tsx

import React from 'react';

interface LoadingProps {
  variant?: 'circular' | 'linear' | 'dots';
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({ variant = 'circular', size = 40 }) => {
  return (
    <div className={`loading-container ${variant}`} style={{ width: size, height: size }}>
      {variant === 'circular' && <div className="circular-spinner" />}
      {variant === 'linear' && <div className="linear-spinner" />}
      {variant === 'dots' && (
        <div className="dots-spinner">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      )}
    </div>
  );
};

export default Loading;
