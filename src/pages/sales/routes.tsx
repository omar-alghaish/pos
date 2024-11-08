import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import AddOrder from "./pages/AddOrder";
import OrdersList from "./pages/OrdersList";
import SalesLayout from "./layout/SalesLayout";
import { FormattedMessage } from "react-intl";
import { BsCart4 } from "react-icons/bs";
import RecurringInvoices from "./pages/RecurringInvoices";

export const salesLinks: Link = {
  path: "/sales",
  title: <FormattedMessage id="sales" defaultMessage="Sales" />,
  state: "sales",
  icon: <BsCart4 />,
  children: [
    {
      path: "sales/orders-list",
      title: <FormattedMessage id="ordersList" defaultMessage="Orders List" />,
      state: "orders-list",
    },
    {
      path: "sales/create-invoice",
      title: (
        <FormattedMessage id="CreateInvoice" defaultMessage="Create Invoice" />
      ),
      state: "create-invoice",
    },
    {
      path: "sales/recurring-invoice",
      title: (
        <FormattedMessage
          id="CreateInvoice"
          defaultMessage="Recurring Invoice"
        />
      ),
      state: "recurring-invoice",
    },
  ],
};

export const salesRoutes: Route = {
  path: "sales",
  element: <SalesLayout />,
  state: "sales",
  children: [
    {
      path: "",
      element: <Navigate to="orders-list" replace />,
      state: "",
    },
    {
      path: "orders-list",
      element: <OrdersList />,
      state: "orders-list",
    },
    {
      path: "add-order",
      element: <AddOrder />,
      state: "add-order",
    },
    {
      path: "recurring-invoice",
      element: <RecurringInvoices />,
      state: "recurring-invoice",
    },
  ],
};
