import Table from "../../components/common/table";
import Header from "../../components/header/Index";
import Typography from "../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";

// Define the data type for your table
interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Home = () => {
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
  ];



  return (
    <div className="home_container">
      <Header />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="key" // Make sure this matches the key in your data
        loading={false}
        scroll={{ y: 300 }}
      />
    </div>
  );
};

export default Home;
