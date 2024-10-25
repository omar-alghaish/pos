import { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import gsap from "gsap";
import Divider from "../../../components/common/divider/Index";
import Typography from "../../../components/common/typography/Index";
import Button from "../../../components/common/button/Index";

interface IFilterSidebar {
  isOpen: boolean;
  onClose: () => void;
  columns: any[]; // Structure for columns
  filters: Record<string, string[]>; // Filters state by column key
  onFilterChange: (columnKey: string, selectedValues: string[]) => void;
  dataSource: any[];
  onResetFilters: () => void; // Function to reset filters
}

const FilterSidebar: React.FC<IFilterSidebar> = ({
  isOpen,
  onClose,
  columns,
  filters,
  onFilterChange,
  dataSource,
  onResetFilters,
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  const handleResize = () => setIsMobile(window.innerWidth < 800);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    gsap.to(sidebarRef.current, {
      display: isOpen ? "block" : "none", // Toggle display based on isOpen
      width: isOpen ? "300px" : "0px",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [isOpen, isMobile]);

  return (
    <div className="filter_sidebar">
      {isOpen && isMobile && <div className="overlay" onClick={onClose} />}
      <div
        ref={sidebarRef}
        className={`filter_sidebar_container ${isMobile ? "absolute" : ""} ${
          isOpen ? "open" : "closed"
        }`} // Add closed class when not open
      >
        <div className="filter_sidebar_content">
          {isOpen && (
            <div className="title">
              <Typography variant="h5">Filters</Typography>
            </div>
          )}

          {isOpen &&
            columns.map((col) => (
              <div key={col.key} className="filter-section">
                <Typography variant="h6">{col.title}</Typography>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={`Select ${col.title}`}
                  value={filters[col.key] || []}
                  onChange={(selectedValues) =>
                    onFilterChange(col.key, selectedValues)
                  }
                >
                  {Array.from(
                    new Set(dataSource.map((item) => item[col.dataIndex]))
                  ).map((value) => (
                    <Select.Option key={value} value={value}>
                      {value}
                    </Select.Option>
                  ))}
                </Select>
                <Divider />
              </div>
            ))}

          {isOpen && (
            <Button
              variant="contained"
              onClick={onResetFilters}
              style={{ marginTop: "20px", width: "100%" }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
