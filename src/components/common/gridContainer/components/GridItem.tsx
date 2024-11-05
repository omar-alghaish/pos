import React from "react"

interface IGridItem {
    children: React.ReactNode
}

const GridItem: React.FC<IGridItem> = ({ children }) => {
  return (
    <div className="grid-item">
      {children}
    </div>
  )
}

export default GridItem
