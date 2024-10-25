import React, { useState, useRef } from "react";
import { FaCamera, FaCalculator } from "react-icons/fa";
import IconButton from "../../../components/common/iconButton/Index";
import Calculator from "./Calculator";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Barcode from "./Barcode";

const DraggableFloatContainer = () => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpenBarcode = () => {
    setIsBarcodeOpen((prev) => !prev);
    setIsCalcOpen(false);
  };

  const toggleOpenCalc = () => {
    setIsCalcOpen((prev) => !prev);
    setIsBarcodeOpen(false);
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    const { x, y } = data;

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const { width: containerWidth, height: containerHeight } = containerRect;

      // Get the screen dimensions
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Constrain the position within the screen bounds
      let newX = x;
      let newY = y;

      // Constrain to the left, top, right, and bottom
      if (x < 0) newX = 0;
      if (y < 0) newY = 0;
      if (x + containerWidth > screenWidth) newX = screenWidth - containerWidth;
      if (y + containerHeight > screenHeight) newY = screenHeight - containerHeight;

      setPosition({ x: newX, y: newY });
    }
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      handle=".header" // Only the header is draggable
    >
      <div
        ref={containerRef}
        className="float_container"
        style={{ userSelect: "none" }}
      >
        <div className="header"></div> {/* Drag this element */}
        <IconButton
          variant={isBarcodeOpen ? "contained" : "text"}
          onClick={toggleOpenBarcode}
          icon={<FaCamera />}
        />
        <IconButton
          variant={isCalcOpen ? "contained" : "text"}
          onClick={toggleOpenCalc}
          icon={<FaCalculator />}
        />
        {/* Conditionally set right or left based on proximity to screen edges */}
        {isBarcodeOpen && (
          <div
            className="barcode_camera container"
            style={{
              left: position.x < window.innerWidth / 2 ? "calc(100% + 5px)" : "auto",
              right: position.x >= window.innerWidth / 2 ? "calc(100% + 5px)" : "auto",
            }}
          >
            <Barcode />
          </div>
        )}
        {isCalcOpen && (
          <div
            className="calculator container"
            style={{
              left: position.x < window.innerWidth / 2 ? "calc(100% + 5px)" : "auto",
              right: position.x >= window.innerWidth / 2 ? "calc(100% + 5px)" : "auto",
            }}
          >
            <Calculator />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableFloatContainer;
