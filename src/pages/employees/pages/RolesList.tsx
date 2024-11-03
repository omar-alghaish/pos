// CategoriesList.tsx

import { useState } from "react";
import DataLayout from "../../../components/layout/DataLayout";
import Typography from "../../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import { Dropdown, Menu, Tag } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons"; // Icons for modern look
import IconButton from "../../../components/common/iconButton/Index";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from "../../../components/common/modal/Index";
import AddRoleForm from "../components/AddRoleForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Button from "../../../components/common/button/Index";

export interface RoleSourceItem {
  key: string;
  id: string;
  name: string;

  dateAdded: string;
  lastUpdated: string;
  status: boolean;
  visibility: boolean;
  permissions: string[];
}

const dataSource: RoleSourceItem[] = [
  {
    key: "1",
    id: "role_1",
    name: "Admin",
    dateAdded: "2024-01-15T10:00:00Z",
    lastUpdated: "2024-10-01T12:30:00Z",
    status: true,
    visibility: true,
    permissions: [
      "dashboard",
      "addProduct",
      "getProduct",
      "updateProduct",
      "deleteProduct",
    ],
  },
  {
    key: "2",
    id: "role_2",
    name: "Manager",
    dateAdded: "2024-02-20T14:30:00Z",
    lastUpdated: "2024-10-02T09:15:00Z",
    status: true,
    visibility: true,
    permissions: ["dashboard", "getProduct", "updateProduct"],
  },
  {
    key: "3",
    id: "role_3",
    name: "Staff",
    dateAdded: "2024-03-10T09:45:00Z",
    lastUpdated: "2024-10-03T08:20:00Z",
    status: true,
    visibility: true,
    permissions: ["dashboard", "getProduct"],
  },
  {
    key: "4",
    id: "role_4",
    name: "Editor",
    dateAdded: "2024-04-05T11:00:00Z",
    lastUpdated: "2024-10-04T13:00:00Z",
    status: true,
    visibility: true,
    permissions: ["dashboard", "addProduct", "updateProduct"],
  },
  {
    key: "5",
    id: "role_5",
    name: "Viewer",
    dateAdded: "2024-05-15T15:20:00Z",
    lastUpdated: "2024-10-05T10:00:00Z",
    status: false,
    visibility: false,
    permissions: ["dashboard"],
  },
];

const RolesList = () => {
  const { darkBrandColor, lightBrandColor, theme } = useSelector(
    (state: RootState) => state.settings.apperance
  );
  const [isFunctionsModlaOpen, setFunctionsModal] = useState(false);
  const [currentFunctions, setCurrentFunctions] = useState<string[]>();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RoleSourceItem>();
  const columns: ColumnsType<RoleSourceItem> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => <Typography>{text}</Typography>,
      sorter: (a, b) => a.id.localeCompare(b.id),
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Typography>{text}</Typography>,
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (array) => (
        <span>
          {array.length > 3 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {array.slice(0, 3).map((item: string, index: number) => (
                <Tag
                  key={index}
                  color={theme == "dark" ? darkBrandColor : lightBrandColor}
                >
                  {item}
                </Tag>
              ))}
              <Button
                color="primary"
                style={{
                  fontSize: "12px",
                  padding: "10px",
                  width: "max-content",
                }}
                onClick={() => showFunctionsModal(array)}
                variant="outlined"
              >
                more
              </Button>
            </div>
          ) : (
            array.map((item: string, index: number) => (
              <Tag
                key={index}
                color={theme == "dark" ? darkBrandColor : lightBrandColor}
              >
                {item}
              </Tag>
            ))
          )}
        </span>
      ),
      width: 350,
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
        isActive ? (
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
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_, row) => (
        <Dropdown overlay={actionMenu} trigger={["click"]}>
          <IconButton
            onClick={() => setSelectedRow(row)}
            icon={<HiOutlineDotsVertical />}
          />
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

  const showFunctionsModal = (functinos: string[]) => {
    setCurrentFunctions(functinos);
    setFunctionsModal(true);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
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
        title="Employees"
        filtersColumns={filtersColumns}
        columns={columns}
        dataSource={dataSource}
        showSidebar={true}
      />
      <Modal
        isOpen={isFunctionsModlaOpen}
        onClose={() => setFunctionsModal(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {currentFunctions?.map((item: string, index: number) => (
            <Tag
              key={index}
              color={theme == "dark" ? darkBrandColor : lightBrandColor}
            >
              {item}
            </Tag>
          ))}
        </div>
      </Modal>
      <Modal
        title={`Edit ${selectedRow?.name}`}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      >
        <AddRoleForm values={selectedRow} type="update" title={""} />
      </Modal>
    </>
  );
};

export default RolesList;
