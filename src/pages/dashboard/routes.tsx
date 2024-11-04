import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import Dashboard from "./Index";
import { TfiDashboard } from "react-icons/tfi";

export const dashboardLinks: Link = {
  path: "/dashboard",
  title: <FormattedMessage id="dashboard" defaultMessage="Dashboard" />,
  state: "dashboard",
  icon: <TfiDashboard />,
};

export const dashboardRoutes: Route = {
  path: "dashboard",
  element: <Dashboard />,
  state: "dashboard",
};
