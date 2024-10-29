// import { useEffect, useRef, useState } from "react";
// import { Select } from "antd";
// import gsap from "gsap";
// import Divider from "../../../components/common/divider/Index";
// import Typography from "../../../components/common/typography/Index";
// import Button from "../../../components/common/button/Index";

// interface IFilterSidebar {
//   isOpen: boolean;
//   onClose: () => void;
//   columns: any[]; // Structure for columns
//   filters: Record<string, string[]>; // Filters state by column key
//   onFilterChange: (columnKey: string, selectedValues: string[]) => void;
//   dataSource: any[];
//   onResetFilters: () => void; // Function to reset filters
//   filtersColumns?: any[]
// }

// const FilterSidebar: React.FC<IFilterSidebar> = ({
//   isOpen,
//   onClose,
//   columns,
//   filters,
//   onFilterChange,
//   dataSource,
//   onResetFilters,
//   filtersColumns
// }) => {
//   const sidebarRef = useRef<HTMLDivElement | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Handle window resize
//   const handleResize = () => setIsMobile(window.innerWidth < 800);

//   useEffect(() => {
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (isOpen && isMobile) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     gsap.to(sidebarRef.current, {
//       display: isOpen ? "block" : "none", // Toggle display based on isOpen
//       width: isOpen ? "300px" : "0px",
//       duration: 0.5,
//       ease: "power2.inOut",
//     });
//   }, [isOpen, isMobile]);

//   const theColumns = columns.filter((column)=> filtersColumns?.find((item)=> item.key == column.key ))


//   return (
//     <div className="filter_sidebar">
//       {isOpen && isMobile && <div className="overlay" onClick={onClose} />}
//       <div
//         ref={sidebarRef}
//         className={`filter_sidebar_container ${isMobile ? "absolute" : ""} ${
//           isOpen ? "open" : "closed"
//         }`} // Add closed class when not open
//       >
//         <div className="filter_sidebar_content">
//           {isOpen && (
//             <div className="title">
//               <Typography variant="h5">Filters</Typography>
//             </div>
//           )}

//           {isOpen &&
//             theColumns.map((col) => (
//               <div key={col.key} className="filter-section">
//                 <Typography variant="h6">{col.title}</Typography>
//                 <Select
//                   mode="multiple"
//                   style={{ width: "100%" }}
//                   placeholder={`Select ${col.title}`}
//                   value={filters[col.key] || []}
//                   onChange={(selectedValues) =>
//                     onFilterChange(col.key, selectedValues)
//                   }
//                 >
//                   {Array.from(
//                     new Set(dataSource.map((item) => item[col.dataIndex]))
//                   ).map((value) => (
//                     <Select.Option key={value} value={value}>
//                       {value}
//                     </Select.Option>
//                   ))}
//                 </Select>
//                 <Divider />
//               </div>
//             ))}

//           {isOpen && (
//             <Button
//               variant="contained"
//               onClick={onResetFilters}
//               style={{ marginTop: "20px", width: "100%" }}
//             >
//               Reset Filters
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterSidebar;



import { useEffect, useRef, useState } from "react";
import { Select, DatePicker } from "antd";
import gsap from "gsap";
import Divider from "../../../components/common/divider/Index";
import Typography from "../../../components/common/typography/Index";
import Button from "../../../components/common/button/Index";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs

const { RangePicker } = DatePicker;
interface IFilterSidebar {
  isOpen: boolean;
  onClose: () => void;
  columns: any[]; // Structure for columns
  filters: Record<string, string[]>; // Filters state by column key
  onFilterChange: (columnKey: string, selectedValues: string[] | string[][]) => void; // Allow string[][] for date ranges
  dataSource: any[];
  onResetFilters: () => void; // Function to reset filters
  filtersColumns?: any[];
}

const FilterSidebar: React.FC<IFilterSidebar> = ({
  isOpen,
  onClose,
  columns,
  filters,
  onFilterChange,
  dataSource,
  onResetFilters,
  filtersColumns
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
      display: isOpen ? "block" : "none",
      width: isOpen ? "300px" : "0px",
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [isOpen, isMobile]);

  const theColumns = columns
  .map((column) => {
    const item = filtersColumns?.find((item) => item.key === column.key);
    // If an item is found, return a new object with the existing column properties plus item.type
    return item ? { ...column, type: item.type } : null; // Return null if no match is found
  })
  .filter((column) => column !== null); // Filter out null values


  
  console.log(theColumns)

  return (
    <div className="filter_sidebar">
      {isOpen && isMobile && <div className="overlay" onClick={onClose} />}
      <div
        ref={sidebarRef}
        className={`filter_sidebar_container ${isMobile ? "absolute" : ""} ${
          isOpen ? "open" : "closed"
        }`}
      >
        <div className="filter_sidebar_content">
          {isOpen && (
            <div className="title">
              <Typography variant="h5">Filters</Typography>
            </div>
          )}

          {isOpen &&
            theColumns.map((col) => (
              <div key={col.key} className="filter-section">
                <Typography variant="h6">{col.title}</Typography>
                {col.type === "date" ? (
                  <div>
                   <RangePicker
  style={{ width: "100%" }}
  value={
    ((filters[col.key] as unknown as string[][])?.[0]?.map((date) => 
      date ? dayjs(date) : null
    ) as [Dayjs | null, Dayjs | null]) || [null, null]
  }
  onChange={(dates) =>
    onFilterChange(
      col.key, 
      [dates?.map((date) => date?.format("YYYY-MM-DD")).filter(Boolean) as string[]]
    )
  }
/>

                    <Button
                      variant="outlined"
                      onClick={() =>
                        onFilterChange(col.key, [
                          ...(filters[col.key] as unknown as string[][]),
                          [],
                        ])
                      }
                    >
                      Add Date
                    </Button>
                  </div>
                ) : (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder={`Select ${col.title}`}
                    value={filters[col.key] as string[] || []}
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
                )}
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
