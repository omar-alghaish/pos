import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import { FaClipboardList } from "react-icons/fa";
import ReportsLayout from "./layouts/ReportsLayout";
import { Navigate } from "react-router-dom";
import SalesReports from "./pages/SalesReports";
import InventoryReports from "./pages/InventoryReports";
import ClientsReports from "./pages/ClientsReports";
import PurchasesReports from "./pages/PurchasesReports";

export const reportsLinks: Link = {
  path: "/reports",
  title: <FormattedMessage id="reports" defaultMessage="Reports" />,
  state: "reports",
  icon: <FaClipboardList />,
  children: [
    {
      path: "/reports/sales-reports",
      title: (
        <FormattedMessage id="salesReports" defaultMessage="Sales Reports" />
      ),
      state: "sales-reports",
    },
    {
      path: "/reports/inventory-reports",
      title: (
        <FormattedMessage
          id="inventoryReports"
          defaultMessage="Inventory Reports"
        />
      ),
      state: "inventory-reports",
    },
    {
      path: "/reports/clients-reports",
      title: (
        <FormattedMessage
          id="clientsReports"
          defaultMessage="Clients Reports"
        />
      ),
      state: "clients-reports",
    },
    {
      path: "/reports/Purchases-reports",
      title: (
        <FormattedMessage
          id="PurchasesReports"
          defaultMessage="Purchases Reports"
        />
      ),
      state: "purchases-reports",
    },
    {
      path: "/reports/system-logs",
      title: <FormattedMessage id="systemLogs" defaultMessage="System Logs" />,
      state: "system-logs",
    },
  ],
};

export const reportsRoutes: Route = {
  path: "reports",
  element: <ReportsLayout />,
  state: "employees",
  children: [
    {
      path: "",
      element: <Navigate to="sales-reports" replace />,
      state: "",
    },
    {
      path: "sales-reports",
      element: <SalesReports />,
      state: "sales-reports",
    },

    {
      path: "inventory-reports",
      element: <InventoryReports />,
      state: "inventory-reports",
    },
    {
      path: "clients-reports",
      element: <ClientsReports />,
      state: "clients-reports",
    },
    {
      path: "purchases-reports",
      element: <PurchasesReports />,
      state: "purchases-reports",
    },
    {
      path: "system-logs",
      element: <InventoryReports />,
      state: "system-logs",
    },
  ],
};
