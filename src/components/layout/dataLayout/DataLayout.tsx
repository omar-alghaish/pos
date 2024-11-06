// import { useState } from "react";
// import FilterSidebar from "../../../pages/products/components/FilterSidebar";
// import Table from "../../common/table";
// import { MdAddCircle, MdFilterListAlt } from "react-icons/md";
// import Button from "../../common/button/Index";
// import Typography from "../../common/typography/Index";
// import Input from "../../common/input/Indext";
// import { IoIosSearch } from "react-icons/io";
// import Drawer from "../../common/drawer";
// import ViewSelect from "../../viewSelect";
// import GridContainer from "../../common/gridContainer/indext";
// import GridItem from "../../common/gridContainer/components/GridItem";
// import Card from "../../card";
// import img from "../../assets/imges/test.jpg";
// import { TbDotsVertical } from "react-icons/tb";
// import { Dropdown, Menu, message } from "antd";

// interface LayoutProps {
//   title: string;
//   columns: any[];
//   dataSource: any[];
//   showSidebar?: boolean;
//   filtersColumns?: any[];
//   allowViewMode?: boolean;
// }

// const DataLayout: React.FC<LayoutProps> = ({
//   filtersColumns,
//   columns,
//   dataSource,
//   showSidebar = false,
//   title,
//   allowViewMode,
// }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState<Record<string, string[]>>({});
//   const [viewMode, setViewMode] = useState<"grid" | "list">("list");

//   const handleViewChange = (mode: "grid" | "list") => {
//     setViewMode(mode);
//   };

//   const truncateString = (str: string, maxLength: number) => {
//     if (str.length > maxLength) {
//       return str.slice(0, maxLength) + "...";
//     }
//     return str;
//   };

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const toggleDetailsDrawer = () => setDetailsDrawerOpen(!detailsDrawerOpen);

//   // Dropdown menu options
//   const menu = (
//     <Menu>
//       <Menu.Item key="details" onClick={() => setDetailsDrawerOpen(true)}>
//         Details
//       </Menu.Item>
//       <Menu.Item key="update" onClick={() => message.info("Update clicked")}>
//         Update
//       </Menu.Item>
//       <Menu.Item key="delete" onClick={() => message.info("Delete clicked")}>
//         Delete
//       </Menu.Item>
//     </Menu>
//   );

//   // Update filters for a column
//   const handleFilterChange = (
//     columnKey: string,
//     selectedValues: string[] | string[][]
//   ) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [columnKey]: Array.isArray(selectedValues[0])
//         ? (selectedValues as string[][])[0]
//         : (selectedValues as string[]),
//     }));
//   };

//   const filteredData = dataSource.filter((item) => {
//     return (
//       Object.values(item).some((value) =>
//         String(value).toLowerCase().includes(searchQuery.toLowerCase())
//       ) &&
//       Object.keys(filters).every((key) =>
//         filters[key].length ? filters[key].includes(String(item[key])) : true
//       )
//     );
//   });

//   const onResetFilters = () => {
//     setFilters(columns.reduce((acc, col) => ({ ...acc, [col.key]: [] }), {}));
//   };

//   return (
//     <div className="data_layout_container">
//       <div className="main_content">
//         <div className="page_content">
//           <div className="data_table">
//             <div className="header">
//               <div className="title">
//                 <Typography variant="h5">{title}:</Typography>
//                 <Typography variant="body2" color="secondary">
//                   {filteredData.length}
//                 </Typography>
//                 <div className="search">
//                   <Input
//                     prefix={<IoIosSearch />}
//                     variant="outlined"
//                     placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="buttons">
//                 <Button
//                   className="filter_button"
//                   variant={`${drawerOpen ? "contained" : "outlined"}`}
//                   onClick={toggleDrawer}
//                 >
//                   <MdFilterListAlt /> Filters
//                 </Button>
//                 <Button variant="contained" className="add_button">
//                   <MdAddCircle /> Add product
//                 </Button>
//                 {allowViewMode && (
//                   <ViewSelect onChangeView={handleViewChange} />
//                 )}
//               </div>
//             </div>
//             {viewMode === "list" ? (
//               <Table
//                 columns={columns}
//                 dataSource={filteredData}
//                 rowKey="key"
//                 loading={false}
//                 scroll={{ y: 600, x: "max-content" }}
//               />
//             ) : (
//               <GridContainer columns={7} gap="10px">
//                 {filteredData.map((item, index) => (
//                   <GridItem key={index}>
//                     <Card
//                       imageUrl={item?.img}
//                       variant="elevated"
//                       elevation={2}
//                       padding="10px"
//                       onClick={() => setDetailsDrawerOpen(true)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         {truncateString(item?.name, 10)}
//                         <Dropdown overlay={menu} trigger={["click"]}>
//                           <TbDotsVertical
//                             style={{ cursor: "pointer" }}
//                             onClick={(e) => e.stopPropagation()} // Prevents click from affecting card selection
//                           />
//                         </Dropdown>
//                       </div>
//                       {item.role && <Typography>{item?.role}</Typography>}
//                     </Card>
//                   </GridItem>
//                 ))}
//               </GridContainer>
//             )}
//           </div>
//         </div>
//         {showSidebar && (
//           <Drawer
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             variant="temporary"
//             direction="right"
//             width="400px"
//           >
//             <FilterSidebar
//               columns={columns}
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               dataSource={dataSource}
//               onResetFilters={onResetFilters}
//               filtersColumns={filtersColumns}
//             />
//           </Drawer>
//         )}
//         <Drawer
//           open={detailsDrawerOpen}
//           onClose={() => setDetailsDrawerOpen(false)}
//           variant="temporary"
//           direction="right"
//           width="400px"
//         >
//           <Typography variant="h6">Details</Typography>
//           {/* Place details content here */}
//         </Drawer>
//       </div>
//     </div>
//   );
// };

// export default DataLayout;

// DataLayout.tsx
// import { useState } from "react";
// import FilterSidebar from "../../../pages/products/components/FilterSidebar";
// import Table from "../../common/table";
// import Header from "./components/Header";
// import CardItem from "./components/CardItem";
// import Drawer from "../../common/drawer";
// import { Menu, message } from "antd";
// import Typography from "../../common/typography/Index";
// import GridContainer from "../../common/gridContainer/indext";
// import GridItem from "../../common/gridContainer/components/GridItem";

// interface LayoutProps {
//   title: string;
//   columns: any[];
//   dataSource: any[];
//   showSidebar?: boolean;
//   filtersColumns?: any[];
//   allowViewMode?: boolean;
// }

// const DataLayout: React.FC<LayoutProps> = ({
//   filtersColumns,
//   columns,
//   dataSource,
//   showSidebar = false,
//   title,
//   allowViewMode,
// }) => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState<Record<string, string[]>>({});
//   const [viewMode, setViewMode] = useState<"grid" | "list">("list");

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   // const toggleDetailsDrawer = () => setDetailsDrawerOpen(!detailsDrawerOpen);

//   // Dropdown menu options
//   const menu = (
//     <Menu>
//       <Menu.Item key="details" onClick={() => setDetailsDrawerOpen(true)}>
//         Details
//       </Menu.Item>
//       <Menu.Item key="update" onClick={() => message.info("Update clicked")}>
//         Update
//       </Menu.Item>
//       <Menu.Item key="delete" onClick={() => message.info("Delete clicked")}>
//         Delete
//       </Menu.Item>
//     </Menu>
//   );

//   const filteredData = dataSource.filter((item) => {
//     return (
//       Object.values(item).some((value) =>
//         String(value).toLowerCase().includes(searchQuery.toLowerCase())
//       ) &&
//       Object.keys(filters).every((key) =>
//         filters[key].length ? filters[key].includes(String(item[key])) : true
//       )
//     );
//   });

//   const onResetFilters = () => {
//     setFilters(columns.reduce((acc, col) => ({ ...acc, [col.key]: [] }), {}));
//   };

//   return (
//     <div className="data_layout_container">
//       <div className="main_content">
//         <div className="page_content">
//           <div className="data_table">
//             <Header
//               title={title}
//               filteredCount={filteredData.length}
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               onFilterToggle={toggleDrawer}
//               onAddProduct={() => message.info("Add product clicked")} // Add appropriate action
//               allowViewMode={allowViewMode}
//               onViewChange={setViewMode}
//             />
//             {viewMode === "list" ? (
//               <Table
//                 columns={columns}
//                 dataSource={filteredData}
//                 rowKey="key"
//                 loading={false}
//                 scroll={{ y: 600, x: "max-content" }}
//               />
//             ) : (
//               <GridContainer columns={7} gap="10px">
//                 {filteredData.map((item, index) => (
//                   <GridItem key={index}>
//                     <CardItem
//                       item={item}
//                       onClick={() => setDetailsDrawerOpen(true)}
//                       menu={menu}
//                       truncateString={(str: string, maxLength: number) =>
//                         str.length > maxLength
//                           ? str.slice(0, maxLength) + "..."
//                           : str
//                       }
//                     />
//                   </GridItem>
//                 ))}
//               </GridContainer>
//             )}
//           </div>
//         </div>
//         {showSidebar && (
//           <Drawer
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             variant="temporary"
//             direction="right"
//             width="400px"
//           >
//             <FilterSidebar
//               columns={columns}
//               filters={filters}
//               onFilterChange={() => {}} // Add appropriate action
//               dataSource={dataSource}
//               onResetFilters={onResetFilters}
//               filtersColumns={filtersColumns}
//             />
//           </Drawer>
//         )}
//         <Drawer
//           open={detailsDrawerOpen}
//           onClose={() => setDetailsDrawerOpen(false)}
//           variant="temporary"
//           direction="right"
//           width="400px"
//         >
//           <Typography variant="h6">Details</Typography>
//           {/* Place details content here */}
//         </Drawer>
//       </div>
//     </div>
//   );
// };

// export default DataLayout;

import { useState } from "react";
import FilterSidebar from "../../../pages/products/components/FilterSidebar";
import Table from "../../common/table";
import Header from "./components/Header";
import CardItem from "./components/CardItem";
import Drawer from "../../common/drawer";
import { Menu, message } from "antd";
import Typography from "../../common/typography/Index";
import GridContainer from "../../common/gridContainer/indext";
import GridItem from "../../common/gridContainer/components/GridItem";

interface LayoutProps {
  title: string;
  columns: any[];
  dataSource: any[];
  showSidebar?: boolean;
  filtersColumns?: any[];
  allowViewMode?: boolean;
}

const DataLayout: React.FC<LayoutProps> = ({
  filtersColumns,
  columns,
  dataSource,
  showSidebar = false,
  title,
  allowViewMode,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [page, setPage] = useState(1);
  const [dataPage] = useState(20);

  const filteredData = dataSource.filter((item) => {
    return (
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      Object.keys(filters).every((key) =>
        filters[key].length ? filters[key].includes(String(item[key])) : true
      )
    );
  });
  const [gridData, setGridData] = useState(filteredData.slice(0, dataPage)); // Initial items
  const [hasMore, setHasMore] = useState(true);

  // Function to load more items
  const loadMoreItems = async () => {
    const newPage = page + 1;
    const startIndex = page * dataPage;
    const endIndex = Math.min(startIndex + dataPage, filteredData.length); // Ensure we don't go out of bounds

    const newItems = filteredData.slice(startIndex, endIndex);

    if (gridData.length === filteredData.length) {
      setHasMore(false);
      return;
    }

    if (newItems.length === 0) {
      setHasMore(false); // No more items to load
      return;
    }

    setGridData((prev) => [...prev, ...newItems]);
    console.log(newItems); // Logs the new items added
    setPage(newPage);
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  // const toggleDetailsDrawer = () => setDetailsDrawerOpen(!detailsDrawerOpen);

  // Dropdown menu options
  const menu = (
    <Menu>
      <Menu.Item key="details" onClick={() => setDetailsDrawerOpen(true)}>
        Details
      </Menu.Item>
      <Menu.Item key="update" onClick={() => message.info("Update clicked")}>
        Update
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => message.info("Delete clicked")}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const onResetFilters = () => {
    setFilters(columns.reduce((acc, col) => ({ ...acc, [col.key]: [] }), {}));
  };

  return (
    <div className="data_layout_container">
      <div className="main_content">
        <div className="page_content">
          <div className="data_table">
            <Header
              title={title}
              filteredCount={filteredData.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onFilterToggle={toggleDrawer}
              onAddProduct={() => message.info("Add product clicked")} // Add appropriate action
              allowViewMode={allowViewMode}
              onViewChange={setViewMode}
            />
            {viewMode === "list" ? (
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="key"
                loading={false}
                scroll={{ y: 600, x: "max-content" }}
              />
            ) : (
              <GridContainer
                columns={4}
                gap="20px"
                loadMore={loadMoreItems}
                hasMore={hasMore}
              >
                {gridData.map((item, index) => (
                  <GridItem key={index}>
                    <CardItem
                      item={item}
                      onClick={() => setDetailsDrawerOpen(true)}
                      menu={menu}
                      truncateString={(str: string, maxLength: number) =>
                        str.length > maxLength
                          ? str.slice(0, maxLength) + "..."
                          : str
                      }
                    />
                  </GridItem>
                ))}
              </GridContainer>
            )}
          </div>
        </div>
        {showSidebar && (
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            variant="temporary"
            direction="right"
            width="400px"
          >
            <FilterSidebar
              columns={columns}
              filters={filters}
              onFilterChange={() => {}} // Add appropriate action
              dataSource={dataSource}
              onResetFilters={onResetFilters}
              filtersColumns={filtersColumns}
            />
          </Drawer>
        )}
        <Drawer
          open={detailsDrawerOpen}
          onClose={() => setDetailsDrawerOpen(false)}
          variant="temporary"
          direction="right"
          width="400px"
        >
          <Typography variant="h6">Details</Typography>
          {/* Place details content here */}
        </Drawer>
      </div>
    </div>
  );
};

export default DataLayout;
