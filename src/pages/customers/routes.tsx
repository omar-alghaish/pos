import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import { HiUsers } from "react-icons/hi";
import AddCustomer from "./pages/AddCustomer";
import CustomerList from "./pages/CustomersList";
import { Navigate } from "react-router-dom";
import CustomersLayout from "./layout/CustomersLayout";
import LoyaltyProgarm from "./pages/LoyaltyProgarm";

export const customersLinks: Link = {
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
      path: "customers/loyalty-program",
      title: (
        <FormattedMessage
          id="loyaltyProgram"
          defaultMessage="Loyalty Program"
        />
      ),
      state: "loyalty-program",
    },
  ],
};

export const customersRoutes: Route = {
  path: "/:lang/customers",
  element: <CustomersLayout />,
  state: "customers",
  children: [
    {
      path: "",
      element: <Navigate to="customer-list" replace />,
      state: "",
    },
    {
      path: "customer-list",
      element: <CustomerList />,
      state: "customer-list",
    },
    {
      path: "add-customer",
      element: <AddCustomer />,
      state: "add-customer",
    },
    {
      path: "loyalty-program",
      element: <LoyaltyProgarm />,
      state: "loyalty-program",
    },
  ],
};
