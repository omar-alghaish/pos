import Home from "../pages/home/Index";

import { IoHomeOutline, IoPersonAddOutline } from "react-icons/io5";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { PiStorefrontLight } from "react-icons/pi";
import { TfiDashboard, TfiHelpAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { BiSolidCategoryAlt, BiStore } from "react-icons/bi";
// import { GiReceiveMoney } from "react-icons/gi";
import { AiOutlineStock } from "react-icons/ai";
import Dashboard from "../pages/dashboard/Index";
import { FormattedMessage } from "react-intl";
import Pos from "../pages/pos/Index";
// import Settings from "../pages/settings/Index";
import Layout from "../pages/settings/layouts/Layout";
import Profile from "../pages/settings/pages/Profile";
import { Navigate } from "react-router-dom";
import MyAccount from "../pages/settings/layouts/MyAccount";
import {
  FaClipboardList,
  // FaEye,
  FaPalette,
  FaLock,
  FaUserShield,
  FaTools,
  FaUserTie,
  // FaKey,
} from "react-icons/fa";
import General from "../pages/settings/pages/General";
import Appearance from "../pages/settings/pages/Appearance";
import Security from "../pages/settings/layouts/Security";
import Password from "../pages/settings/pages/Password";
import Developer from "../pages/settings/layouts/Developer";
import TwoFactorAuth from "../pages/settings/pages/TwoFactorAuth";
import Webhooks from "../pages/settings/pages/Webhooks";
import ApiKeys from "../pages/settings/pages/ApiKeys";
import BarcodePage from "../pages/barcodePage";
import ProductsLayout from "../pages/products/layouts/ProductsLayout";
import ProductsList from "../pages/products/pages/ProductsTable";
import AddProduct from "../pages/products/pages/AddProduct";
import AddCategory from "../pages/categories/pages/AddCategory";
import CategoriesList from "../pages/categories/pages/CategoriesList";
import CategoriesLayout from "../pages/categories/layout/CategoriesLayout";
import CustomersLayout from "../pages/customers/layout/CustomersLayout";
import CustomerList from "../pages/customers/pages/CustomersList";
import AddCustomer from "../pages/customers/pages/AddCustomer";
import AddEmployee from "../pages/employees/pages/AddEmployee";
import EmployeesList from "../pages/employees/pages/EmployeesList";
import EmployeesLayout from "../pages/employees/layout/EmployeessLayout";
import RolesList from "../pages/employees/pages/RolesList";
import AddRole from "../pages/employees/pages/AddRole";
import { BsUpcScan } from "react-icons/bs";
interface Route {
  index?: boolean;
  path?: string;
  element: JSX.Element;
  state: string;
  children?: Route[];
}

// Define the Link interface
interface Link {
  path: string;
  state: string;
  title: JSX.Element;
  children?: Link[];
  icon?: JSX.Element;
}

export const Links: Link[] = [
  {
    path: "/",
    title: <FormattedMessage id="home" defaultMessage="Home" />,
    state: "home",
    icon: <IoHomeOutline />,
  },
  {
    path: "/dashboard",
    title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
    state: "dashboard",
    icon: <TfiDashboard />
    ,
  },
  {
    path: "/pos",
    title: <FormattedMessage id="pos" defaultMessage="POS" />,
    state: "pos",
    icon: <PiStorefrontLight />,
    // children: [
    //   {
    //     path: "/sales",
    //     title: <FormattedMessage id="sales" defaultMessage="Sales" />,
    //     state: "sales",
    //   },
    //   {
    //     path: "/create-sale",
    //     title: (
    //       <FormattedMessage id="createSale" defaultMessage="Create Sale" />
    //     ),
    //     state: "create-sale",
    //   },
    //   {
    //     path: "/returns",
    //     title: <FormattedMessage id="returns" defaultMessage="Returns" />,
    //     state: "returns",
    //   },
    //   {
    //     path: "/invoices",
    //     title: (
    //       <FormattedMessage id="invoices" defaultMessage="Customer Invoices" />
    //     ),
    //     state: "invoices",
    //   },
    // ],
  },
  {
    path: "/barcode-scanner",
    title: (
      <FormattedMessage id="barcode-scanner" defaultMessage="barcode scanner" />
    ),
    state: "barcode-scanner",
    icon: <BsUpcScan />
    ,
  },
  {
    path: "/inventory",
    title: <FormattedMessage id="inventory" defaultMessage="Inventory" />,
    state: "inventory",
    icon: <AiOutlineStock />,
    children: [
      {
        path: "/inventory-overview",
        title: (
          <FormattedMessage
            id="inventoryOverview"
            defaultMessage="Inventory Overview"
          />
        ),
        state: "inventory-overview",
      },
      {
        path: "/suppliers",
        title: <FormattedMessage id="suppliers" defaultMessage="Suppliers" />,
        state: "suppliers",
      },
      {
        path: "/purchase-orders",
        title: (
          <FormattedMessage
            id="purchaseOrders"
            defaultMessage="Purchase Orders"
          />
        ),
        state: "purchase-orders",
      },
    ],
  },
  {
    path: "/products",
    title: <FormattedMessage id="products" defaultMessage="Products" />,
    state: "products",
    icon: <BiStore />,
    children: [
      {
        path: "products/add-product",
        title: (
          <FormattedMessage id="addProduct" defaultMessage="Add New Product" />
        ),
        state: "add-product",
      },
      {
        path: "products/products-list",
        title: (
          <FormattedMessage id="productList" defaultMessage="Product List" />
        ),
        state: "product-list",
      },
      {
        path: "/categories",
        title: <FormattedMessage id="categories" defaultMessage="Categories" />,
        state: "categories",
      },
    ],
  },
  {
    path: "/categories",
    title: <FormattedMessage id="categories" defaultMessage="categories" />,
    state: "categories",
    icon: <BiSolidCategoryAlt />
    ,
    children: [
      {
        path: "categories/add-category",
        title: (
          <FormattedMessage
            id="addCategory"
            defaultMessage="Add New Category"
          />
        ),
        state: "add-category",
      },
      {
        path: "categories/categories-list",
        title: (
          <FormattedMessage id="categorytList" defaultMessage="Category List" />
        ),
        state: "category-list",
      },
    ],
  },
  {
    path: "/customers",
    title: <FormattedMessage id="customers" defaultMessage="Customers" />,
    state: "customers",
    icon: <HiUsers />,
    children: [
      {
        path: "customers/add-customer",
        title: (
          <FormattedMessage id="addCustomer" defaultMessage="Add Customer" />
        ),
        state: "add-customer",
      },
      {
        path: "customers/customer-list",
        title: (
          <FormattedMessage id="customerList" defaultMessage="Customer List" />
        ),
        state: "customer-list",
      },
      {
        path: "/loyalty-program",
        title: (
          <FormattedMessage
            id="loyaltyProgram"
            defaultMessage="Loyalty Program"
          />
        ),
        state: "loyalty-program",
      },
    ],
  },
  {
    path: "/employees",
    title: <FormattedMessage id="employees" defaultMessage="Employees" />,
    state: "employees",
    icon: <HiUserGroup />, // Icon for employees section
    children: [
      {
        path: "/employees/employee-list",
        title: (
          <FormattedMessage id="employeeList" defaultMessage="Employee List" />
        ),
        state: "employee-list",
        icon: <HiUserGroup />,
      },
      {
        path: "/employees/add-employee",
        title: (
          <FormattedMessage id="addEmployee" defaultMessage="Add Employee" />
        ),
        state: "add-employee",
        icon: <IoPersonAddOutline />,
      },
      {
        path: "/employees/roles-list",
        title: <FormattedMessage id="rolesList" defaultMessage="Roles" />,
        state: "employee-roles-list",
        icon: <FaUserTie />,
      },
      {
        path: "/employees/add-role",
        title: <FormattedMessage id="addRole" defaultMessage="Add role" />,
        state: "add-role",
        icon: <FaUserTie />,
      },
    ],
  },
  {
    path: "/reports",
    title: <FormattedMessage id="reports" defaultMessage="Reports" />,
    state: "reports",
    icon: <FaClipboardList />,
    children: [
      {
        path: "/sales-reports",
        title: (
          <FormattedMessage id="salesReports" defaultMessage="Sales Reports" />
        ),
        state: "sales-reports",
      },
      {
        path: "/inventory-reports",
        title: (
          <FormattedMessage
            id="inventoryReports"
            defaultMessage="Inventory Reports"
          />
        ),
        state: "inventory-reports",
      },
    ],
  },
];

export const otherLinks: Link[] = [
  {
    path: "/settings",
    title: <FormattedMessage id="settings" defaultMessage="Settings" />,
    state: "settings",
    icon: <IoSettingsOutline />,
  },
  {
    path: "/help",
    title: <FormattedMessage id="help" defaultMessage="Help" />,
    state: "help",
    icon: <TfiHelpAlt />,
  },
];

export const settingsLinks: Link[] = [
  {
    path: "/my-account",
    title: <FormattedMessage id="my-account" defaultMessage="My account" />,
    state: "my-account",
    icon: <FaClipboardList />,
    children: [
      {
        path: "/settings/my-account/profile",
        title: <FormattedMessage id="profile" defaultMessage="profile" />,
        state: "profile",
      },
      {
        path: "/settings/my-account/general",
        title: <FormattedMessage id="general" defaultMessage="General" />,
        state: "general",
        icon: <FaTools />, // Add an icon for General
      },
      {
        path: "/settings/my-account/appearance",
        title: <FormattedMessage id="appearance" defaultMessage="Appearance" />,
        state: "appearance",
        icon: <FaPalette />, // Add an icon for Appearance
      },
    ],
  },
  {
    path: "/settings/security",
    title: <FormattedMessage id="security" defaultMessage="Security" />,
    state: "security",
    icon: <FaLock />, // Add an icon for Security
    children: [
      {
        path: "/settings/security/password",
        title: <FormattedMessage id="add-password" defaultMessage="Password" />,
        state: "password",
      },
      {
        path: "/settings/security/two-factor-auth",
        title: (
          <FormattedMessage
            id="two-factor-auth"
            defaultMessage="Two Factor Auth"
          />
        ),
        state: "two-factor-auth",
      },
    ],
  },
  {
    path: "/settings/developer",
    title: <FormattedMessage id="developer" defaultMessage="Developer" />,
    state: "developer",
    icon: <FaUserShield />, // Add an icon for Developer
    children: [
      {
        path: "/settings/developer/webhooks",
        title: <FormattedMessage id="webhooks" defaultMessage="Webhooks" />,
        state: "webhooks",
      },
      {
        path: "/settings/developer/api-keys",
        title: <FormattedMessage id="api-keys" defaultMessage="API Keys" />,
        state: "api-keys",
      },
    ],
  },
];

const routes: Route[] = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    state: "dashboard",
  },
  {
    path: "pos",
    element: <Pos />,
    state: "pos",
  },
  {
    path: "barcode-scanner",
    element: <BarcodePage />,
    state: "pos",
  },
  {
    path: "settings",
    element: <Layout />, // Parent Layout with Sidebar
    state: "settings",
    children: [
      {
        path: "", // Default behavior when navigating to /settings
        element: <Navigate to="my-account" replace />, // Redirect to my-account
        state: "",
      },
      {
        path: "my-account",
        element: <MyAccount />, // Parent route
        state: "my-account",
        children: [
          {
            path: "", // Default behavior when navigating to /settings/my-account
            element: <Navigate to="profile" replace />, // Redirect to profile
            state: "",
          },
          {
            path: "profile",
            element: <Profile />,
            state: "profile-settings",
          },
          {
            path: "general",
            element: <General />,
            state: "general",
          },
          {
            path: "appearance",
            element: <Appearance />,
            state: "appearance",
          },
        ],
      },
      {
        path: "security",
        element: <Security />, // Parent route
        state: "security",
        children: [
          {
            path: "", // Default behavior when navigating to /settings/my-account
            element: <Navigate to="password" replace />, // Redirect to profile
            state: "",
          },
          {
            path: "password",
            element: <Password />,
            state: "password",
          },
          {
            path: "two-factor-auth",
            element: <TwoFactorAuth />,
            state: "two-factor-auth",
          },
        ],
      },
      {
        path: "developer",
        element: <Developer />, // Parent route
        state: "developer",
        children: [
          {
            path: "", // Default behavior when navigating to /settings/my-account
            element: <Navigate to="webhooks" replace />, // Redirect to profile
            state: "",
          },
          {
            path: "webhooks",
            element: <Webhooks />,
            state: "webhooks",
          },
          {
            path: "api-keys",
            element: <ApiKeys />,
            state: "api-keys",
          },
        ],
      },
    ],
  },
  {
    path: "products",
    element: <ProductsLayout />, // Parent Layout with Sidebar
    state: "products",
    children: [
      {
        path: "", // Default behavior when navigating to /settings
        element: <Navigate to="products-list" replace />, // Redirect to my-account
        state: "",
      },
      {
        path: "products-list",
        element: <ProductsList />, // Parent route
        state: "products-list",
      },
      {
        path: "add-product",
        element: <AddProduct />, // Parent route
        state: "add-product",
      },
    ],
  },
  {
    path: "categories",
    element: <CategoriesLayout />, // Parent Layout with Sidebar
    state: "categories",
    children: [
      {
        path: "", // Default behavior when navigating to /settings
        element: <Navigate to="categories-list" replace />, // Redirect to my-account
        state: "",
      },
      {
        path: "categories-list",
        element: <CategoriesList />, // Parent route
        state: "categories-list",
      },
      {
        path: "add-category",
        element: <AddCategory />, // Parent route
        state: "add-category",
      },
    ],
  },
  {
    path: "customers",
    element: <CustomersLayout />, // Parent Layout with Sidebar
    state: "customers",
    children: [
      {
        path: "", // Default behavior when navigating to /settings
        element: <Navigate to="customer-list" replace />, // Redirect to my-account
        state: "",
      },
      {
        path: "customer-list",
        element: <CustomerList />, // Parent route
        state: "customer-list",
      },
      {
        path: "add-customer",
        element: <AddCustomer />, // Parent route
        state: "add-customer",
      },
    ],
  },
  {
    path: "employees",
    element: <EmployeesLayout />, // Parent layout for employees with possible sidebar
    state: "employees",
    children: [
      {
        path: "", // Default behavior when navigating to /employees
        element: <Navigate to="employee-list" replace />, // Redirect to employee list
        state: "",
      },
      {
        path: "employee-list",
        element: <EmployeesList />,
        state: "employee-list",
      },
      {
        path: "add-employee",
        element: <AddEmployee />,
        state: "add-employee",
      },
      {
        path: "roles-list",
        element: <RolesList />,
        state: "employee-roles-list",
      },
      {
        path: "add-role",
        element: <AddRole />,
        state: "employee-roles-list",
      },
    ],
  },
];

export default routes;
