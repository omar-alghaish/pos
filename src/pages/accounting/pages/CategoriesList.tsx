// CategoriesList.tsx

import  { useState } from "react";
import DataLayout from "../../../components/layout/dataLayout/DataLayout";
import Typography from "../../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import { Button, Dropdown, Menu, Tag } from "antd";
import {

  FireOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"; // Icons for modern look
import IconButton from "../../../components/common/iconButton/Index";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../../../components/common/modal/Index";

interface CategoryDataSourceItem {
  key: string;
  categoryId: string;
  categoryName: string;
  description: string;
  productsCount: number;
  dateCreated: string;
  lastUpdated: string;
  status: "Active" | "Inactive";
  visibility: boolean;
  totalSales: number;
  profitMargin: number;
  color: string;
  avgProductRating?: number; // New field
  totalInventoryValue?: number; // New field
  lowStockAlert?: boolean; // New field
  trending?: boolean; // New field
}

const dataSource: CategoryDataSourceItem[] = [
  {
    color: "#FF5733",
    key: "1",
    categoryId: "C001",
    categoryName: "Electronics",
    description: "Devices and gadgets",
    productsCount: 150,
    dateCreated: "2024-01-15",
    lastUpdated: "2024-10-01",
    status: "Active",
    visibility: true,
    totalSales: 50000,
    profitMargin: 20,
    avgProductRating: 4.5,
    lowStockAlert: false,
    trending: true,
    totalInventoryValue: 30000,
  },
  {
    color: "#33FFBD",
    key: "2",
    categoryId: "C002",
    categoryName: "Apparel",
    description: "Clothing and accessories",
    productsCount: 120,
    dateCreated: "2024-02-01",
    lastUpdated: "2024-09-15",
    status: "Active",
    visibility: true,
    totalSales: 30000,
    profitMargin: 35,
    avgProductRating: 4.1,
    lowStockAlert: true,
    trending: false,
    totalInventoryValue: 18000,
  },
  {
    color: "#335BFF",
    key: "3",
    categoryId: "C003",
    categoryName: "Home & Kitchen",
    description: "Home essentials and kitchenware",
    productsCount: 85,
    dateCreated: "2024-03-05",
    lastUpdated: "2024-08-10",
    status: "Inactive",
    visibility: false,
    totalSales: 20000,
    profitMargin: 25,
    avgProductRating: 3.8,
    lowStockAlert: false,
    trending: true,
    totalInventoryValue: 15000,
  },
];

const CategoriesList = () => {
  const [isDescriptionModalVisible, setDescriptionModalVisible] =
    useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

  const columns: ColumnsType<CategoryDataSourceItem> = [
    {
      title: "ID",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (text: string) => <Typography>{text}</Typography>,
      sorter: (a, b) => a.categoryId.localeCompare(b.categoryId),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Trending",
      dataIndex: "trending",
      key: "trending",
      render: (isTrending) =>
        isTrending ? (
          <Tag icon={<FireOutlined />} color="magenta">
            Trending
          </Tag>
        ) : null,
      filters: [
        { text: "Trending", value: true },
        { text: "Not Trending", value: false },
      ],
      onFilter: (value, record) => record.trending === value,
    },
    {
      title: "Total Inventory Value",
      dataIndex: "totalInventoryValue",
      key: "totalInventoryValue",
      render: (value) =>
        value ? <Typography>{`$${value.toFixed(2)}`}</Typography> : null,
      sorter: (a, b) =>
        (a.totalInventoryValue || 0) - (b.totalInventoryValue || 0),
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      render: (color: string) => (
        <div
          style={{
            width: "40px",
            height: "40px",
            background: color,
            borderRadius: "5px",
          }}
        />
      ),
    },
    {
      title: "Total Sales",
      dataIndex: "totalSales",
      key: "totalSales",
      sorter: (a, b) => a.totalSales - b.totalSales,
      sortDirections: ["ascend", "descend"],
      width: 150,
    },

    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      sorter: (a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      sorter: (a, b) =>
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
      sortDirections: ["ascend", "descend"],
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (isActive) =>
        isActive == "Active" ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Active
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Inactive
          </Tag>
        ),
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      width: 100,
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      render: (isVisible) =>
        isVisible ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
      filters: [
        { text: "Visible", value: true },
        { text: "Hidden", value: false },
      ],
      onFilter: (value, record) => record.visibility === value,
      width: 100,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text) => (
        <span>
          {text.length > 30 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              {text.slice(0, 30)}...
              <Button
                color="primary"
                style={{ fontSize: "12px", padding: "0" }}
                onClick={() => showDescriptionModal(text)}
              >
                (more)
              </Button>
            </div>
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: () => (
        <Dropdown overlay={actionMenu} trigger={["click"]}>
          <IconButton icon={<HiOutlineDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  const filtersColumns = [
    { key: "color" },
    { key: "trending" },
    { key: "status" },
    { key: "visibility" },
  ];

  const actionMenu = (
    <Menu>
      <Menu.Item key="edit">
        <span onClick={() => handleEdit()}>Edit</span>
      </Menu.Item>
      <Menu.Item key="delete">
        <span onClick={() => handleDelete()}>Delete</span>
      </Menu.Item>
      <Menu.Item key="view">
        <span onClick={() => handleView()}>View</span>
      </Menu.Item>
    </Menu>
  );

  const showDescriptionModal = (description: string) => {
    setCurrentDescription(description);
    setDescriptionModalVisible(true);
  };

  const handleEdit = () => {
    console.log("Edit action");
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleView = () => {
    console.log("View action");
  };
  return (
    <>
    
   
    <DataLayout
      title="Categories"
      filtersColumns={filtersColumns}
      columns={columns}
      dataSource={dataSource}
      showSidebar={true}
    />
    <Modal isOpen={isDescriptionModalVisible} onClose={()=> setDescriptionModalVisible(false)} >
{currentDescription}
    </Modal>
     </>
  );
};

export default CategoriesList;

//   <div
//     style={{
//       width: "40px",
//       height: "40px",
//       background: text,
//       borderRadius: "5px",
//     }}
//   ></div>
