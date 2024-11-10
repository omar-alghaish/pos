import { useEffect, useState } from "react";
import Table from "../../components/common/table";
import Header from "../../components/header/Index";
import Typography from "../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import InstallPWAButton from "../../components/installPWAButton";
import { FaCashRegister, FaPlusCircle, FaProductHunt, FaUserAlt } from "react-icons/fa";
import { AiOutlineBranches } from "react-icons/ai"; // Example for a branch icon
import { Link, useParams } from "react-router-dom";

// Define the data type for your table
interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Home = () => {
  // State to store the current date and time
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  // Function to update the current date and time
  const updateDateTime = () => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString()); // Format as desired
  };

  // Use effect to set an interval for updating the time
  useEffect(() => {
    updateDateTime(); // Set initial value
    const interval = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

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

  const links = [
    {
      path: "customers/customer-list",
      title: 'Customers',
      icon: <FaUserAlt /> // Icon for customers
    },
    {
      path: "pos",
      title: 'Pos',
      icon: <FaCashRegister /> // Icon for POS
    },
    {
      path: "branches",
      title: 'Branch',
      icon: <AiOutlineBranches /> // Icon for branches
    },
    {
      path: "products/products-list",
      title: 'Products',
      icon: <FaProductHunt /> // Icon for products
    },
    {
      path: "sales/create-invoice",
      title: 'Create invoice',
      icon: <FaCashRegister /> // Icon for invoice creation
    },
    {
      path: "customers/add-customer",
      title: 'Add customer',
      icon: <FaPlusCircle /> // Icon for adding customer
    },
  ];
  
  const {lang} = useParams()

  return (
    <div className="home_container">
      <Header />

      <div
        className="content"
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* First Banner */}
        <div
          className="banner"
          style={{
            // background: "linear-gradient(45deg, #f12711, #f5af19)", // Gradient background
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Hello, Omar Alghaish</Typography>
          <Typography>{currentDateTime}</Typography>
        </div>
        {/* Second Banner */}
        <div
          className="banner"
          style={{
            height: "300px",
            background: "linear-gradient(45deg, #f12711, #f5af19)", // Gradient background
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h3">Special Promotion!</Typography>
          <Typography variant="subtitle2">
            Save 20% on all orders this weekend!
          </Typography>
          <Typography variant="body2">
            Tip of the Day: Use the inventory management feature for efficiency!
          </Typography>
        </div>
        <InstallPWAButton />
        {/* Table */}

        <div className="grid_buttons">
        {links.map((item,index)=>(
          <Link style={{backgroundColor: [
            "#ff6b6b",
            "#feca57",
            "#1dd1a1",
            "#5f27cd",
            "#54a0ff",
            "#ff9ff3",
          ][index % 6]}} to={`/${lang}/${item.path}`} className="item">{item.icon}{item.title}</Link>
        ))}
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="key" // Make sure this matches the key in your data
          loading={false}
          scroll={{ y: 300 }}
          tableTitle={""}
        />
      </div>
    </div>
  );
};

export default Home;
