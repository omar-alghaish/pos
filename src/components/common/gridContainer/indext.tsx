import React from 'react';

type GridContainerProps = {
  columns: number; // Number of columns in the grid
  gap?: string;    // Gap between grid items, e.g., "20px"
  children: React.ReactNode;
};

const GridContainer: React.FC<GridContainerProps> = ({ columns, gap = '20px', children }) => {
  return (
    <div className="grid-container" style={{ '--columns': columns, '--gap': gap } as React.CSSProperties}>
      {children}
    </div>
  );
};

export default GridContainer;
