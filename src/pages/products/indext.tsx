// ProductsList.tsx
import React from "react";

import ProductsTable from "./components/ProductsTable";
import DataLayout from "../../components/layout/DataLayout";


import Typography from "../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import { SpaceContext } from "antd/lib/space";
import { Button } from "antd";

interface DataSourceItem {
  key: string; // Unique identifier for the row, usually the productId
  productId: string; // Product ID
  productName: string; // Product name
  category: string; // Product category
  stockQuantity: number; // Quantity of the product in stock
  price: number; // Product price
  discount: number; // Discount percentage on the product
  supplier: string; // Supplier of the product
  dateAdded: string; // Date the product was added
}

const columns: ColumnsType<DataSourceItem> = [
  {
    title: "Product ID",
    dataIndex: "productId",
    key: "productId",
    render: (text: string) => <Typography>{text}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.productId.localeCompare(b.productId),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    render: (text: string) => <Typography>{text}</Typography>,
    filters: [
      { text: "Product A", value: "Product A" },
      { text: "Product B", value: "Product B" },
    ],
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.productName.localeCompare(b.productName),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    filters: [
      { text: "Electronics", value: "Electronics" },
      { text: "Apparel", value: "Apparel" },
    ],
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.category.localeCompare(b.category),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Stock Quantity",
    dataIndex: "stockQuantity",
    key: "stockQuantity",
    render: (text: number) => <Typography>{text}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.stockQuantity - b.stockQuantity,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text: number) => <Typography>{`$${text.toFixed(2)}`}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.price - b.price,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (text: number) => <Typography>{`${text}%`}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.discount - b.discount,
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.supplier.localeCompare(b.supplier),
  },
  {
    title: "Date Added",
    dataIndex: "dateAdded",
    key: "dateAdded",
    render: (text: string) => <Typography>{new Date(text).toLocaleDateString()}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime(),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <span>
        <Button>Edit</Button>
        <Button danger >Delete</Button>
      </span>
    ),
  },
];


// Sample data
const dataSource = [
  {key:1, productId: "P001", productName: "Wireless Mouse", category: "Electronics", stockQuantity: 150, price: 19.99, discount: 10, supplier: "Tech Supplies Inc.", dateAdded: "2024-01-15" },
  {key:2, productId: "P002", productName: "Bluetooth Speaker", category: "Electronics", stockQuantity: 75, price: 29.99, discount: 5, supplier: "Audio World", dateAdded: "2024-02-01" },
  { productId: "P003", productName: "Desk Lamp", category: "Home & Office", stockQuantity: 200, price: 14.99, discount: 15, supplier: "Home Goods", dateAdded: "2024-02-12" },
  { productId: "P004", productName: "Running Shoes", category: "Apparel", stockQuantity: 90, price: 49.99, discount: 20, supplier: "Sports Gear Ltd.", dateAdded: "2024-03-10" },
  { productId: "P005", productName: "Yoga Mat", category: "Sports", stockQuantity: 50, price: 24.99, discount: 10, supplier: "Sports World", dateAdded: "2024-03-18" },
  { productId: "P006", productName: "LED Monitor", category: "Electronics", stockQuantity: 30, price: 129.99, discount: 12, supplier: "Tech Supplies Inc.", dateAdded: "2024-04-02" },
  { productId: "P007", productName: "Office Chair", category: "Home & Office", stockQuantity: 60, price: 89.99, discount: 25, supplier: "Furniture Depot", dateAdded: "2024-04-15" },
  { productId: "P008", productName: "Backpack", category: "Apparel", stockQuantity: 140, price: 39.99, discount: 8, supplier: "Urban Bags", dateAdded: "2024-05-05" },
  { productId: "P009", productName: "Sunglasses", category: "Accessories", stockQuantity: 200, price: 15.99, discount: 5, supplier: "Fashion Hub", dateAdded: "2024-05-25" },
  { productId: "P010", productName: "Keyboard", category: "Electronics", stockQuantity: 100, price: 24.99, discount: 7, supplier: "Tech Supplies Inc.", dateAdded: "2024-06-01" },
  { productId: "P011", productName: "Tablet", category: "Electronics", stockQuantity: 45, price: 199.99, discount: 18, supplier: "Tech Zone", dateAdded: "2024-06-15" },
  { productId: "P012", productName: "Electric Kettle", category: "Home & Kitchen", stockQuantity: 70, price: 22.99, discount: 10, supplier: "Home Essentials", dateAdded: "2024-07-10" },
  { productId: "P013", productName: "Gaming Console", category: "Electronics", stockQuantity: 20, price: 299.99, discount: 15, supplier: "Game On", dateAdded: "2024-07-20" },
  { productId: "P014", productName: "Coffee Maker", category: "Home & Kitchen", stockQuantity: 40, price: 59.99, discount: 12, supplier: "Kitchen Pro", dateAdded: "2024-08-01" },
  { productId: "P015", productName: "Smart Watch", category: "Electronics", stockQuantity: 85, price: 149.99, discount: 10, supplier: "Gadget World", dateAdded: "2024-08-12" },
  { productId: "P016", productName: "Blender", category: "Home & Kitchen", stockQuantity: 55, price: 34.99, discount: 20, supplier: "Kitchen Essentials", dateAdded: "2024-08-20" },
  { productId: "P017", productName: "Jacket", category: "Apparel", stockQuantity: 120, price: 59.99, discount: 30, supplier: "Apparel Hub", dateAdded: "2024-09-01" },
  { productId: "P018", productName: "Electric Drill", category: "Tools", stockQuantity: 35, price: 79.99, discount: 15, supplier: "Tool World", dateAdded: "2024-09-10" },
  { productId: "P019", productName: "Water Bottle", category: "Sports", stockQuantity: 220, price: 9.99, discount: 5, supplier: "Sports World", dateAdded: "2024-09-15" },
  { productId: "P020", productName: "Headphones", category: "Electronics", stockQuantity: 60, price: 49.99, discount: 10, supplier: "Audio World", dateAdded: "2024-09-25" },
  { productId: "P021", productName: "Cookware Set", category: "Home & Kitchen", stockQuantity: 30, price: 99.99, discount: 20, supplier: "Home Goods", dateAdded: "2024-10-01" },
  { productId: "P022", productName: "Smartphone", category: "Electronics", stockQuantity: 25, price: 499.99, discount: 15, supplier: "Tech World", dateAdded: "2024-10-10" },
  { productId: "P023", productName: "Microwave Oven", category: "Home & Kitchen", stockQuantity: 20, price: 79.99, discount: 10, supplier: "Appliance Center", dateAdded: "2024-10-20" },
  { productId: "P024", productName: "Basketball", category: "Sports", stockQuantity: 90, price: 19.99, discount: 5, supplier: "Sports Hub", dateAdded: "2024-11-01" },
  { productId: "P025", productName: "Vacuum Cleaner", category: "Home & Kitchen", stockQuantity: 40, price: 89.99, discount: 15, supplier: "Clean Home", dateAdded: "2024-11-10" },
  { productId: "P026", productName: "Tablet Case", category: "Accessories", stockQuantity: 160, price: 12.99, discount: 8, supplier: "Tech Accessories", dateAdded: "2024-11-15" },
  { productId: "P027", productName: "Wireless Charger", category: "Electronics", stockQuantity: 75, price: 29.99, discount: 10, supplier: "Gadget Hub", dateAdded: "2024-11-20" },
  { productId: "P028", productName: "Running Shorts", category: "Apparel", stockQuantity: 100, price: 24.99, discount: 12, supplier: "Sports Gear Ltd.", dateAdded: "2024-12-01" },
  { productId: "P029", productName: "Electric Toothbrush", category: "Personal Care", stockQuantity: 45, price: 39.99, discount: 15, supplier: "Health Essentials", dateAdded: "2024-12-10" },
  { productId: "P030", productName: "Hair Dryer", category: "Personal Care", stockQuantity: 60, price: 29.99, discount: 10, supplier: "Beauty Supplies", dateAdded: "2024-12-15" },
];

const ProductsList = () => {
  return (
    <DataLayout title="Products" columns={columns} dataSource={dataSource} showSidebar={true} />
      
  );
};

export default ProductsList;
