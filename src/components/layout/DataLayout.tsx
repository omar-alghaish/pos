import { useState } from "react";
import FilterSidebar from "../../pages/products/components/FilterSidebar";
import Table from "../common/table";
import { MdAddCircle, MdFilterListAlt } from "react-icons/md";
import Button from "../common/button/Index";
import Typography from "../common/typography/Index";
import Input from "../common/input/Indext";
import { IoIosSearch } from "react-icons/io";
import Drawer from "../common/drawer";

interface LayoutProps {
  title: string;
  columns: any[];
  dataSource: any[];
  showSidebar?: boolean;
  filtersColumns?: any[];
}

const DataLayout: React.FC<LayoutProps> = ({
  filtersColumns,
  columns,
  dataSource,
  showSidebar = false,
  title,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // Update filters for a column
  const handleFilterChange = (
    columnKey: string,
    selectedValues: string[] | string[][]
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnKey]: Array.isArray(selectedValues[0])
        ? (selectedValues as string[][])[0]
        : (selectedValues as string[]),
    }));
  };

  // Filter data based on search query and selected column filters
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

  const onResetFilters = () => {
    setFilters(columns.reduce((acc, col) => ({ ...acc, [col.key]: [] }), {}));
  };

  return (
    <div className="data_layout_container">
      <div className="main_content">
        <div className="page_content">
          <div className="data_table">
            <div className="header">
              <div className="title">
                <Typography variant="h5">{title}:</Typography>
                <Typography variant="body2" color="secondary">
                  {filteredData.length}
                </Typography>
                <div className="search">
                  <Input
                    prefix={(<IoIosSearch />) }
                    variant="outlined"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="buttons">
                <Button
                  variant={`${drawerOpen ? "contained" : "outlined"}`}
                  onClick={toggleDrawer}
                >
                  <MdFilterListAlt /> Filters
                </Button>
                <Button variant="contained">
                  <MdAddCircle /> Add product
                </Button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="key"
              loading={false}
              scroll={{ y: 600, x: "max-content" }}
            />
          </div>
        </div>
{
    showSidebar && <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          variant="temporary"
          direction="right"
          width="400px"
        >
          <FilterSidebar
            columns={columns}
            filters={filters}
            onFilterChange={handleFilterChange}
            dataSource={dataSource}
            onResetFilters={onResetFilters}
            filtersColumns={filtersColumns}
          />
        </Drawer>
}
        
      </div>
    </div>
  );
};

export default DataLayout;
