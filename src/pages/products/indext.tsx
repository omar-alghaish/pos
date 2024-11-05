// ProductsList.tsx

import DataLayout from "../../components/layout/dataLayout/DataLayout";


import Typography from "../../components/common/typography/Index";
import { ColumnsType } from "antd/lib/table";
import { Button } from "antd";
import img from "../../assets/imges/test.jpg"
import Avatar from "../../components/common/avatar/Index";

interface DataSourceItem {
  key: string; // Unique identifier for the row, usually the productId
  productId: string; // Product ID
  name: string; // Product name
  category: string; // Product category
  stockQuantity: number; // Quantity of the product in stock
  price: number; // Product price
  discount: number; // Discount percentage on the product
  supplier: string; // Supplier of the product
  dateAdded: string; 
  img?:string
}

const columns: ColumnsType<DataSourceItem> = [
  {
    title: "ID",
    dataIndex: "productId",
    key: "productId",
    render: (text: string) => <Typography>{text}</Typography>,
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.productId.localeCompare(b.productId),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "img",
    dataIndex: "img",
    key: "img",
    render: (img: string) => (
      <Typography>
        <Avatar src={img} onClick={function (): void {}} />
      </Typography>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <Typography>{text}</Typography>,
    // filters: [
    //   { text: "Product A", value: "Product A" },
    //   { text: "Product B", value: "Product B" },
    // ],
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.name.localeCompare(b.name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    // filters: [
    //   { text: "Electronics", value: "Electronics" },
    //   { text: "Apparel", value: "Apparel" },
    // ],
    sorter: (a: DataSourceItem, b: DataSourceItem) => a.category.localeCompare(b.category),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Quantity",
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
    render: () => (
      <span>
        <Button>Edit</Button>
        <Button danger >Delete</Button>
      </span>
    ),
  },
];


const filtersColumns = [
  {
    key:"category",
  },
  {key:"supplier"},
  {
    key:"dateAdded",
    type: 'date'
  }
]


// Sample data
const dataSource = [
  {key:1, productId: "P001", name: "Wireless Mouse", category: "Electronics", stockQuantity: 150, price: 19.99, discount: 10, supplier: "Tech Supplies Inc.", dateAdded: "2024-01-15",img:img },
  {key:2, productId: "P002", name: "Bluetooth Speaker", category: "Electronics", stockQuantity: 75, price: 29.99, discount: 5, supplier: "Audio World", dateAdded: "2024-02-01" ,img:img},
  { productId: "P003", name: "Desk Lamp", category: "Home & Office", stockQuantity: 200, price: 14.99, discount: 15, supplier: "Home Goods", dateAdded: "2024-02-12" ,img:img},
  { productId: "P004", name: "Running Shoes", category: "Apparel", stockQuantity: 90, price: 49.99, discount: 20, supplier: "Sports Gear Ltd.", dateAdded: "2024-03-10" ,img:img},
  { productId: "P005", name: "Yoga Mat", category: "Sports", stockQuantity: 50, price: 24.99, discount: 10, supplier: "Sports World", dateAdded: "2024-03-18" ,img:img},
  { productId: "P006", name: "LED Monitor", category: "Electronics", stockQuantity: 30, price: 129.99, discount: 12, supplier: "Tech Supplies Inc.", dateAdded: "2024-04-02" ,img:img},
  { productId: "P007", name: "Office Chair", category: "Home & Office", stockQuantity: 60, price: 89.99, discount: 25, supplier: "Furniture Depot", dateAdded: "2024-04-15" ,img:img},
  { productId: "P008", name: "Backpack", category: "Apparel", stockQuantity: 140, price: 39.99, discount: 8, supplier: "Urban Bags", dateAdded: "2024-05-05" ,img:img},
  { productId: "P009", name: "Sunglasses", category: "Accessories", stockQuantity: 200, price: 15.99, discount: 5, supplier: "Fashion Hub", dateAdded: "2024-05-25" ,img:img},
  { productId: "P010", name: "Keyboard", category: "Electronics", stockQuantity: 100, price: 24.99, discount: 7, supplier: "Tech Supplies Inc.", dateAdded: "2024-06-01" ,img:img},
  { productId: "P011", name: "Tablet", category: "Electronics", stockQuantity: 45, price: 199.99, discount: 18, supplier: "Tech Zone", dateAdded: "2024-06-15" ,img:img},
  { productId: "P012", name: "Electric Kettle", category: "Home & Kitchen", stockQuantity: 70, price: 22.99, discount: 10, supplier: "Home Essentials", dateAdded: "2024-07-10" ,img:img},
  { productId: "P013", name: "Gaming Console", category: "Electronics", stockQuantity: 20, price: 299.99, discount: 15, supplier: "Game On", dateAdded: "2024-07-20" ,img:img},
  { productId: "P014", name: "Coffee Maker", category: "Home & Kitchen", stockQuantity: 40, price: 59.99, discount: 12, supplier: "Kitchen Pro", dateAdded: "2024-08-01" ,img:img},
  { productId: "P015", name: "Smart Watch", category: "Electronics", stockQuantity: 85, price: 149.99, discount: 10, supplier: "Gadget World", dateAdded: "2024-08-12" ,img:img},
  { productId: "P016", name: "Blender", category: "Home & Kitchen", stockQuantity: 55, price: 34.99, discount: 20, supplier: "Kitchen Essentials", dateAdded: "2024-08-20" ,img:img},
  { productId: "P017", name: "Jacket", category: "Apparel", stockQuantity: 120, price: 59.99, discount: 30, supplier: "Apparel Hub", dateAdded: "2024-09-01",img:img },
  { productId: "P018", name: "Electric Drill", category: "Tools", stockQuantity: 35, price: 79.99, discount: 15, supplier: "Tool World", dateAdded: "2024-09-10",img:img },
  { productId: "P019", name: "Water Bottle", category: "Sports", stockQuantity: 220, price: 9.99, discount: 5, supplier: "Sports World", dateAdded: "2024-09-15",img:img },
  { productId: "P020", name: "Headphones", category: "Electronics", stockQuantity: 60, price: 49.99, discount: 10, supplier: "Audio World", dateAdded: "2024-09-25" ,img:img},
  { productId: "P021", name: "Cookware Set", category: "Home & Kitchen", stockQuantity: 30, price: 99.99, discount: 20, supplier: "Home Goods", dateAdded: "2024-10-01" ,img:img},
  { productId: "P022", name: "Smartphone", category: "Electronics", stockQuantity: 25, price: 499.99, discount: 15, supplier: "Tech World", dateAdded: "2024-10-10" ,img:img},
  { productId: "P023", name: "Microwave Oven", category: "Home & Kitchen", stockQuantity: 20, price: 79.99, discount: 10, supplier: "Appliance Center", dateAdded: "2024-10-20" ,img:img},
  { productId: "P024", name: "Basketball", category: "Sports", stockQuantity: 90, price: 19.99, discount: 5, supplier: "Sports Hub", dateAdded: "2024-11-01" ,img:img},
  { productId: "P025", name: "Vacuum Cleaner", category: "Home & Kitchen", stockQuantity: 40, price: 89.99, discount: 15, supplier: "Clean Home", dateAdded: "2024-11-10" ,img:img},
  { productId: "P026", name: "Tablet Case", category: "Accessories", stockQuantity: 160, price: 12.99, discount: 8, supplier: "Tech Accessories", dateAdded: "2024-11-15" ,img:img},
  { productId: "P027", name: "Wireless Charger", category: "Electronics", stockQuantity: 75, price: 29.99, discount: 10, supplier: "Gadget Hub", dateAdded: "2024-11-20" ,img:img},
  { productId: "P028", name: "Running Shorts", category: "Apparel", stockQuantity: 100, price: 24.99, discount: 12, supplier: "Sports Gear Ltd.", dateAdded: "2024-12-01" ,img:img},
  { productId: "P029", name: "Electric Toothbrush", category: "Personal Care", stockQuantity: 45, price: 39.99, discount: 15, supplier: "Health Essentials", dateAdded: "2024-12-10" ,img:img},
  { productId: "P030", name: "Hair Dryer", category: "Personal Care", stockQuantity: 60, price: 29.99, discount: 10, supplier: "Beauty Supplies", dateAdded: "2024-12-15" ,img:img},
];

const ProductsList = () => {
  return (
    <DataLayout allowViewMode={true} title="Products" filtersColumns={filtersColumns} columns={columns} dataSource={dataSource} showSidebar={true} />
      
  );
};

export default ProductsList;
