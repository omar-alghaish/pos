// CategoriesList.tsx

import { useState } from "react";
import DataLayout from "../../../components/layout/DataLayout";
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
import AddCustomerForm from "../components/AddCustomersForm";

export interface CustomerDataSourceItem {
  key: string;
  id: string;
  name: string;
  address: string;
  phoneNumber1: string;
  phoneNumber2: string;
  ordersCount: number;
  dateAdded: string;
  lastUpdated: string;
  status: boolean;
  visibility: boolean;
  totalOrdersPrice?: number; // New field
}

const dataSource: CustomerDataSourceItem[] = [
  {
    key: "1",
    id: "C001",
    name: "Omar alghaish",
    address: "Devices and gadgets",
    ordersCount: 150,
    dateAdded: "2024-01-15",
    lastUpdated: "2024-10-01",
    status: true,
    visibility: true,
    totalOrdersPrice: 30000,
    phoneNumber1: "123434234234",
    phoneNumber2: "12345834342342",
  },
  {
    key: "2",
    id: "C002",
    name: "ismail mohammed",
    address: "Clothing and accessories",
    ordersCount: 120,
    dateAdded: "2024-02-01",
    lastUpdated: "2024-09-15",
    status: true,
    visibility: true,

    totalOrdersPrice: 18000,
    phoneNumber1: "123434234234",
    phoneNumber2: "12345834342342",
  },
  {
    key: "3",
    id: "C003",
    name: "belal abdelkhalek",
    address: "Home essentials and kitchenware",
    ordersCount: 85,
    dateAdded: "2024-03-05",
    lastUpdated: "2024-08-10",
    status: true,
    visibility: false,
    phoneNumber1: "123434234234",
    phoneNumber2: "12345834342342",
    totalOrdersPrice: 15000,
  },
];

const CustomerList = () => {
  const [isaddressModalVisible, setaddressModalVisible] = useState(false);
  const [currentaddress, setCurrentaddress] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CustomerDataSourceItem>();
  const columns: ColumnsType<CustomerDataSourceItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Typography>{text}</Typography>,
      sorter: (a, b) => a.id.localeCompare(b.id),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Phone 1",
      dataIndex: "phoneNumber1",
      key: "phoneNumber1",
      render: (text: string) => <Typography>{text}</Typography>,
    },
    {
      title: "Phone 2",
      dataIndex: "phoneNumber2",
      key: "phoneNumber2",
      render: (text: string) => <Typography>{text}</Typography>,
    },
    {
      title: "Total orders price",
      dataIndex: "totalOrdersPrice",
      key: "totalOrdersPrice",
      render: (value) =>
        value ? <Typography>{`$${value.toFixed(2)}`}</Typography> : null,
      sorter: (a, b) => (a.totalOrdersPrice || 0) - (b.totalOrdersPrice || 0),
      width: 200,
    },

    {
      title: "Date Created",
      dataIndex: "dateAdded",
      key: "dateAdded",
      sorter: (a, b) =>
        new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
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
        isActive  ? (
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
      title: "address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      render: (text) => (
        <span>
          {text.length > 30 ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              {text.slice(0, 30)}...
              <Button
                color="primary"
                style={{ fontSize: "12px", padding: "0" }}
                onClick={() => showaddressModal(text)}
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

  const filtersColumns = [{ key: "status" }, { key: "visibility" }];

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

  const showaddressModal = (address: string) => {
    setCurrentaddress(address);
    setaddressModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalOpen(true)
  };


  const handleDelete = () => {
    console.log("Delete action");
  };

  const handleView = () => {
    console.log("View action");
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };
  return (
    <>
      <DataLayout
        title="Customers"
        filtersColumns={filtersColumns}
        columns={columns}
        dataSource={dataSource}
        showSidebar={true}
      />
      <Modal
        isOpen={isaddressModalVisible}
        onClose={() => setaddressModalVisible(false)}
      >
        {currentaddress}
      </Modal>
      <Modal
        title={`Edit ${selectedRow?.name}`}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      >
        <AddCustomerForm values={selectedRow} type="update" title={""} />
      </Modal>
    </>
  );
};

export default CustomerList;
