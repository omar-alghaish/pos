import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useRef } from "react";
import Typography from "../../../components/common/typography/Index";
import img from "../../../assets/imges/test.jpg";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { IProduct } from "../Index";
import Button from "../../../components/common/button/Index";

interface ProductProps {
  onClick: (e: ReactMouseEvent<HTMLDivElement>) => void;
  item: IProduct;
}

interface ContextMenuPosition {
  x: number;
  y: number;
}

const Product: React.FC<ProductProps> = ({ onClick, item }) => {
  const { order } = useSelector((state: RootState) => state);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<ContextMenuPosition>({
    x: 0,
    y: 0,
  });

  const contextMenuRef = useRef<HTMLDivElement | null>(null); // To track the menu element

  // Check if the item is in the order and apply 'selected' class
  const isSelected = order.items.some((orderItem) => orderItem.id === item.id);

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Close any previously open context menu
    setContextMenuVisible(false);
    // Set position and make the context menu visible
    setMenuPosition({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
    setContextMenuVisible(true);
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  // Effect to close the context menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if the click is outside the context menu
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenuVisible(false);
      }
    };

    // Add a global event listener to the document for detecting clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`product_container ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      style={{ position: "relative" }}
    >
      <div className="img_container">
        <img src={img} alt={item.name} />
      </div>
      <Typography className="product_name">{item.name}</Typography>
      <div className="info">
        <div className="category_text">
          <Typography style={{ color: item.color }} className="category" variant="body2">
            {item.category}
          </Typography>
          <div style={{ backgroundColor: item.color }} className="category_background" />
        </div>

        <Typography className="price" variant="h6">
          {item.item_price}$
        </Typography>
      </div>

      {/* Custom Context Menu */}
      {contextMenuVisible && (
        <div
          ref={contextMenuRef} // Attach the ref to the context menu
          className="custom-context-menu"
          style={{
            position: "fixed",
            top: menuPosition.y,
            left: menuPosition.x,
            zIndex: 1000,
          }}
        >
          <Button className="menu-item">Edit Product</Button>
          <Button className="menu-item">Delete Product</Button>
          <Button className="menu-item">View Details</Button>
        </div>
      )}
    </div>
  );
};

export default Product;
