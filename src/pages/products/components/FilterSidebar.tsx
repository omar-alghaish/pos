import { useRef } from "react";
import { Select, DatePicker } from "antd";
import Divider from "../../../components/common/divider/Index";
import Typography from "../../../components/common/typography/Index";
import Button from "../../../components/common/button/Index";
import dayjs, { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
interface IFilterSidebar {
  columns: any[];
  filters: Record<string, string[]>;
  onFilterChange: (
    columnKey: string,
    selectedValues: string[] | string[][]
  ) => void;
  dataSource: any[];
  onResetFilters: () => void;
  filtersColumns?: any[];
}

const FilterSidebar: React.FC<IFilterSidebar> = ({
  columns,
  filters,
  onFilterChange,
  dataSource,
  onResetFilters,
  filtersColumns,
}) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const theColumns = columns
    .map((column) => {
      const item = filtersColumns?.find((item) => item.key === column.key);
      return item ? { ...column, type: item.type } : null;
    })
    .filter((column) => column !== null);

  console.log(theColumns);

  return (
    <div className="filter_sidebar">
      <div ref={sidebarRef} className={`filter_sidebar_container`}>
        <div className="filter_sidebar_content">
          <div className="title">
            <Typography variant="h5">Filters</Typography>
          </div>

          {theColumns.map((col) => (
            <div key={col.key} className="filter-section">
              <Typography variant="h6">{col.title}</Typography>
              {col.type === "date" ? (
                <div>
                  <RangePicker
                    style={{ width: "100%" }}
                    value={
                      ((filters[col.key] as unknown as string[][])?.[0]?.map(
                        (date) => (date ? dayjs(date) : null)
                      ) as [Dayjs | null, Dayjs | null]) || [null, null]
                    }
                    onChange={(dates) =>
                      onFilterChange(col.key, [
                        dates
                          ?.map((date) => date?.format("YYYY-MM-DD"))
                          .filter(Boolean) as string[],
                      ])
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
                  value={(filters[col.key] as string[]) || []}
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

          <Button
            variant="contained"
            onClick={onResetFilters}
            style={{ marginTop: "20px", width: "100%" }}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
