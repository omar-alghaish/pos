import React, { useState } from "react";
import Table from "../../../components/common/table";
// import Header from "../../components/header/Index";
import Typography from "../../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import Header from "../../../components/header/Index";
import Button from "../../../components/common/button/Index";
import { MdAddCircle, MdFilterListAlt } from "react-icons/md";
import Input from "../../../components/common/input/Indext";
import { IoIosSearch } from "react-icons/io";

// Define the data type for your table
interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface IProductsTabel {
  toggleSidebarFilter: () => void;
}

const ProductsTable: React.FC<IProductsTabel> = ({ toggleSidebarFilter }) => {
  // Sample columns with Typography, filtering, and sorting
  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Typography>{text}</Typography>,
      filters: [
        { text: "John Doe", value: "John Doe" },
        { text: "Jane Smith", value: "Jane Smith" },
      ],
      // Update the onFilter to accept the correct value type
      // onFilter: (value: string | number | boolean, record: DataSourceItem) =>
      //   record.name.includes(value as string),
      sorter: (a: DataSourceItem, b: DataSourceItem) =>
        a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      render: (text: number) => <Typography>{text}</Typography>,
      sorter: (a: DataSourceItem, b: DataSourceItem) => a.age - b.age,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string) => <Typography>{text}</Typography>,
      filters: [
        { text: "New York", value: "New York" },
        { text: "London", value: "London" },
      ],
      // Update the onFilter to accept the correct value type
      // onFilter: (value: string | number | boolean, record: DataSourceItem) =>
      //   record.address.includes(value as string),
      sorter: (a: DataSourceItem, b: DataSourceItem) =>
        a.address.localeCompare(b.address),
      sortDirections: ["ascend", "descend"],
    },
  ];

  // Sample data
  const dataSource: DataSourceItem[] = [
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "1",
      name: "John Doe",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jane Smith",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Sam Brown",
      age: 29,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelection = (selectedKeys: string[]) => {
    setSelectedRowKeys(selectedKeys);
  };

  return (
    <div className="products_table">
      {/* <Header /> */}

      <div className="header">
        <div className="title">
          <Typography variant="h5">Products:</Typography>
          <Typography variant="body2" color="secondary">
            342
          </Typography>
          <div className="search">
            <Input
              prefix={<IoIosSearch />} // Use prefix to add the icon inside the input field
              placeholder="Search"
              value={""}
              onChange={function (
                e: React.ChangeEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <Button variant="contained" onClick={toggleSidebarFilter}>
            <MdFilterListAlt />
            Filters
          </Button>
          <Button variant="contained">
            <MdAddCircle />
            Add product
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key" // Make sure this matches the key in your data
        loading={false}
        scroll={{ y: 600 }}
      />
    </div>
  );
};

export default ProductsTable;
