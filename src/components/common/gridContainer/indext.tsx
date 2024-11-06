// import React from 'react';

// type GridContainerProps = {
//   columns: number; // Number of columns in the grid
//   gap?: string;    // Gap between grid items, e.g., "20px"
//   children: React.ReactNode;
// };

// const GridContainer: React.FC<GridContainerProps> = ({ columns, gap = '20px', children }) => {
//   return (
//     <div className="grid-container" style={{ '--columns': columns, '--gap': gap } as React.CSSProperties}>
//       {children}
//     </div>
//   );
// };

// export default GridContainer;

// GridContainer.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import Loading from "../loading/Index";

type GridContainerProps = {
  columns: number; // Number of columns in the grid
  gap?: string; // Gap between grid items
  children: React.ReactNode[]; // Grid items to render
  loadMore: () => Promise<void>; // Function to load more items
  hasMore: boolean; // Whether there are more items to load
};

const GridContainer: React.FC<GridContainerProps> = ({
  columns,
  gap = "20px",
  children,
  loadMore,
  hasMore,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(async () => {
    if (!containerRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    containerRef.current.addEventListener;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setIsLoading(true);
      setTimeout(() => {
      try {
         loadMore();
      } finally {
          setIsLoading(false);
      }    
      }, 2000);
    
    }
  }, [isLoading, loadMore, hasMore]);

  useEffect(() => {
    const container = containerRef.current;

    const onScroll = () => {
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      // Reset loading state when scrolling up (allows triggering `loadMore` again on next down-scroll)
      if (scrollTop + clientHeight < scrollHeight - 50 && isLoading) {
        setIsLoading(false);
      }

      handleScroll(); // Call scroll handler whenever scrolling occurs
    };

    if (container) {
      container.addEventListener("scroll", onScroll);
      return () => container.removeEventListener("scroll", onScroll);
    }
  }, [handleScroll, isLoading]);

  return (
    <div        ref={containerRef}
    style={
      {
        "--columns": columns,
        "--gap": gap,
        maxHeight: "500px",
        overflowY: "auto",
      } as React.CSSProperties
    }>
      <div
        className="grid-container"
        style={
          {
            "--columns": columns,
            "--gap": gap,
            // maxHeight: "500px",
            overflowY: "auto",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
      {isLoading && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"10px"
          }}
        >
          <Loading variant="circular" />
        </div>
      )}
    </div>
  );
};

export default GridContainer;
