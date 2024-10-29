import React, { useState } from "react";
import DataLayout from "../../../components/layout/DataLayout";
import { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Tag } from "antd";
import Button from "../../../components/common/button/Index";
import {
  WarningOutlined,
  FireOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons"; // Icons for modern look
import img from "../../../assets/imges/test.jpg";
import Modal from "../../../components/common/modal/Index";
import { HiOutlineDotsVertical } from "react-icons/hi";
import IconButton from "../../../components/common/iconButton/Index";
import AddProductForm from "../components/AddProductForm";
export interface DataSourceItem {
  key: string;
  productId: string;
  img: string;
  productName: string;
  category: string;
  stockQuantity: number;
  price: number;
  discount: number;
  supplier: string;
  dateAdded: string;
  lowStockAlert?: boolean;
  trending?: boolean;
  avgProductRating?: number;
  dateCreated: string;
  lastUpdated: string;
  status: "Active" | "Inactive";
  visibility: boolean;
  totalSales: number;
  profitMargin: number;
  description: string;
  SKU: string;
  barcode: string;
  options?: { name: string; price: string }[];
  notes?: string[];
}

const dataSource: DataSourceItem[] = [
  {
    key: "1",
    productId: "P001",
    img: img,
    productName: "Wireless Mouse",
    SKU: "WM-001",
    barcode: "1234567890123",
    category: "Electronics",
    supplier: "TechSupplier Inc.",
    stockQuantity: 50,
    price: 29.99,
    discount: 10,
    totalSales: 150,
    profitMargin: 25.0,
    lowStockAlert: true,
    trending: true,
    dateAdded: "2024-01-15",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-20",
    status: "Active",
    visibility: true,
    description: "A high-quality wireless mouse with ergonomic design.",
  },
  {
    key: "2",
    img: img,
    options: [{ name: "test", price: "35" }],
    notes: ["this is test"],

    productId: "P002",
    productName: "Mechanical Keyboard",
    SKU: "MK-002",
    barcode: "1234567890124",
    category: "Electronics",
    supplier: "KeyboardWorld",
    stockQuantity: 35,
    price: 79.99,
    discount: 15,
    totalSales: 100,
    profitMargin: 30.0,
    lowStockAlert: false,
    trending: true,
    dateAdded: "2024-01-10",
    dateCreated: "2024-01-02",
    lastUpdated: "2024-01-22",
    status: "Inactive",
    visibility: true,
    description:
      "A durable mechanical keyboard with customizable RGB lighting.",
  },
  {
    key: "3",
    productId: "P003",
    img: img,

    productName: "USB-C Hub",
    SKU: "UH-003",
    barcode: "1234567890125",
    category: "Accessories",
    supplier: "GadgetStore",
    stockQuantity: 120,
    price: 39.99,
    discount: 5,
    totalSales: 200,
    profitMargin: 20.0,
    lowStockAlert: false,
    trending: false,
    dateAdded: "2024-01-05",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-15",
    status: "Active",
    visibility: true,
    description: "A compact USB-C hub with multiple ports for convenience.",
  },
  {
    key: "4",
    productId: "P004",
    img: img,
    options: [{ name: "test", price: "35" }],

    productName: "HDMI Cable",
    SKU: "HC-004",
    barcode: "1234567890126",
    category: "Accessories",
    supplier: "CableWorld",
    stockQuantity: 200,
    price: 14.99,
    discount: 0,
    totalSales: 300,
    profitMargin: 15.0,
    lowStockAlert: false,
    trending: false,
    dateAdded: "2024-01-12",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-18",
    status: "Active",
    visibility: true,
    description: "A high-speed HDMI cable for 4K resolution.",
  },
  {
    key: "5",
    productId: "P005",
    img: img,
    notes: ["this is test"],

    productName: "Wireless Earbuds",
    SKU: "WE-005",
    barcode: "1234567890127",
    category: "Audio",
    supplier: "SoundExperts",
    stockQuantity: 70,
    price: 49.99,
    discount: 20,
    totalSales: 180,
    profitMargin: 35.0,
    lowStockAlert: true,
    trending: true,
    dateAdded: "2024-01-08",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-21",
    status: "Active",
    visibility: true,
    description:
      "Wireless earbuds with noise cancellation and long battery life.",
  },
  {
    key: "6",
    productId: "P006",
    img: img,

    productName: "Gaming Monitor",
    SKU: "GM-006",
    barcode: "1234567890128",
    category: "Electronics",
    supplier: "MonitorMasters",
    stockQuantity: 15,
    price: 299.99,
    discount: 25,
    totalSales: 50,
    profitMargin: 40.0,
    lowStockAlert: true,
    trending: false,
    dateAdded: "2024-01-03",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-19",
    status: "Active",
    visibility: true,
    description:
      "A high-resolution gaming monitor with a refresh rate of 144Hz.",
  },
  {
    key: "7",
    productId: "P007",
    img: img,

    productName: "Bluetooth Speaker",
    SKU: "BS-007",
    barcode: "1234567890129",
    category: "Audio",
    supplier: "AudioPros",
    stockQuantity: 80,
    price: 59.99,
    discount: 10,
    totalSales: 220,
    profitMargin: 22.0,
    lowStockAlert: false,
    trending: true,
    dateAdded: "2024-01-09",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-20",
    status: "Active",
    visibility: true,
    description:
      "Portable Bluetooth speaker with deep bass and waterproof design.",
  },
  {
    key: "8",
    productId: "P008",
    img: img,

    productName: "Laptop Stand",
    SKU: "LS-008",
    barcode: "1234567890130",
    category: "Accessories",
    supplier: "OfficeGear",
    stockQuantity: 60,
    price: 29.99,
    discount: 5,
    totalSales: 130,
    profitMargin: 20.0,
    lowStockAlert: false,
    trending: false,
    dateAdded: "2024-01-07",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-17",
    status: "Active",
    visibility: true,
    description: "Adjustable laptop stand for better ergonomics.",
  },
  {
    key: "9",
    productId: "P009",
    img: img,

    productName: "Portable Charger",
    SKU: "PC-009",
    barcode: "1234567890131",
    category: "Accessories",
    supplier: "PowerSolutions",
    stockQuantity: 90,
    price: 24.99,
    discount: 15,
    totalSales: 250,
    profitMargin: 18.0,
    lowStockAlert: false,
    trending: true,
    dateAdded: "2024-01-06",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-16",
    status: "Active",
    visibility: true,
    description: "High-capacity portable charger for smartphones and tablets.",
  },
  {
    key: "10",
    productId: "P010",
    img: img,

    productName: "Smartwatch",
    SKU: "SW-010",
    barcode: "1234567890132",
    category: "Wearables",
    supplier: "SmartTech",
    stockQuantity: 40,
    price: 199.99,
    discount: 20,
    totalSales: 90,
    profitMargin: 30.0,
    lowStockAlert: true,
    trending: false,
    dateAdded: "2024-01-04",
    dateCreated: "2024-01-01",
    lastUpdated: "2024-01-14",
    status: "Active",
    visibility: true,
    description: "Smartwatch with fitness tracking and notification alerts.",
  },
];

const ProductsList: React.FC = () => {
  const [isNotesModalVisible, setNotesModalVisible] = useState(false);
  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataSourceItem>()

  const [isDescriptionModalVisible, setDescriptionModalVisible] =
    useState(false);

  const [currentNotes, setCurrentNotes] = useState<string[]>([]);
  const [currentDescription, setCurrentDescription] = useState("");

  const [currentOptions, setCurrentOptions] = useState<
    { name: string; price: string }[]
  >([]);

  const columns: ColumnsType<DataSourceItem> = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "img",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <div>
          <img
            src={img}
            alt=""
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "SKU",
      dataIndex: "SKU",
      key: "SKU",
      width: 100,
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
      sortDirections: ["ascend", "descend"],
      width: 120,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `${discount}%`,
      sorter: (a, b) => a.discount - b.discount,
      sortDirections: ["ascend", "descend"],
      width: 150,
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
      title: "Profit Margin",
      dataIndex: "profitMargin",
      key: "profitMargin",
      render: (margin: number) => `${margin.toFixed(2)}%`,
      sorter: (a, b) => a.profitMargin - b.profitMargin,
      sortDirections: ["ascend", "descend"],
      width: 150,
    },

    {
      title: "Low Stock Alert",
      dataIndex: "lowStockAlert",
      key: "lowStockAlert",
      render: (alert) =>
        alert ? (
          <Tag icon={<WarningOutlined />} color="volcano">
            Low Stock
          </Tag>
        ) : null,
      filters: [
        { text: "Low Stock", value: true },
        { text: "Sufficient Stock", value: false },
      ],
      onFilter: (value, record) => record.lowStockAlert === value,
      width: 150,
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
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      sorter: (a, b) =>
        new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
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
      title: "Options",
      dataIndex: "options",
      key: "options",
      render: (options) =>
        options?.length > 0 ? (
          <Button
            onClick={() => handleOpenOptions(options)}
            style={{ padding: " 5px 10px", borderRadius: "5px" }}
            variant="outlined"
          >
            open
          </Button>
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
      width: 100,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (notes) =>
        notes?.length > 0 ? (
          <Button
            onClick={() => handleOpenNotes(notes)}
            style={{ padding: " 5px 10px", borderRadius: "5px" }}
            variant="outlined"
          >
            open
          </Button>
        ) : (
          <CloseCircleOutlined style={{ color: "red" }} />
        ),
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
      render: (_,row) => (
        <Dropdown  overlay={actionMenu} trigger={["click"]}>
          <IconButton onClick={()=> setSelectedRow(row)} icon={<HiOutlineDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  const filtersColumns = [
    { key: "category" },
    { key: "SKU" },
    { key: "supplier" },
    { key: "lowStockAlert" },
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

  const handleEdit = () => {
    setEditModalOpen(true)
  };

  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleView = () => {
    console.log("View action");
  };

  const showDescriptionModal = (description: string) => {
    setCurrentDescription(description);
    setDescriptionModalVisible(true);
  };

  const handleCloseDescription = () => {
    setDescriptionModalVisible(false);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleOpenNotes = (notes: string[]) => {
    setCurrentNotes(notes);
    setNotesModalVisible(true);
  };

  // Open Options Modal
  const handleOpenOptions = (options: { name: string; price: string }[]) => {
    setCurrentOptions(options);
    setOptionsModalVisible(true);
  };

  // Close Modals
  const handleCloseNotes = () => {
    setNotesModalVisible(false);
  };

  const handleCloseOptions = () => {
    setOptionsModalVisible(false);
  };
  return (
    <>
      <DataLayout
        columns={columns}
        dataSource={dataSource}
        title={"products"}
        showSidebar={true}
        filtersColumns={filtersColumns}
      />
      <Modal
        title="Notes"
        isOpen={isNotesModalVisible}
        onClose={handleCloseNotes}
        // onCancel={handleCloseNotes}
      >
        <ul>
          {currentNotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </Modal>

      {/* Options Modal */}
      <Modal
        title="Options"
        isOpen={isOptionsModalVisible}
        // onOk={handleCloseOptions}
        onClose={handleCloseOptions}
      >
        <ul>
          {currentOptions.map((option, index) => (
            <li key={index}>
              {option.name}: ${option.price}
            </li>
          ))}
        </ul>
      </Modal>
      <Modal
        title="Full Description"
        isOpen={isDescriptionModalVisible}
        onClose={handleCloseDescription}
      >
        <p>{currentDescription}</p>
      </Modal>
      <Modal
        title={`Edit ${selectedRow?.productName}`}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      >
        <AddProductForm  values={selectedRow} type="update"/>
      </Modal>
    </>
  );
};

export default ProductsList;
