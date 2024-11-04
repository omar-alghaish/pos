import { TfiHelpAlt } from "react-icons/tfi";
import { IoSettingsOutline } from "react-icons/io5";
import { FormattedMessage } from "react-intl";
import { Link, Route } from "./types";
import {
  accountingLinks,
  accountingRoutes,
  barcodePageLinks,
  barcodeRoutes,
  branchesLinks,
  branchesRoutes,
  categoriesLinks,
  categoriesRoutes,
  customersLinks,
  customersRoutes,
  dashboardLinks,
  dashboardRoutes,
  employeesLinks,
  employeesRoutes,
  homeLinks,
  homeRoutes,
  posLinks,
  posRoutes,
  productsLinks,
  productsRoutes,
  promotionsLinks,
  promotionsRoutes,
  reportsLinks,
  reportsRoutes,
  salesLinks,
  salesRoutes,
  settingsLinks,
  settingsRoutes,
  suppliersLinks,
  suppliersRoutes,
} from "../pages";

export const Links: Link[] = [
  homeLinks,
  dashboardLinks,
  posLinks,
  barcodePageLinks,
  productsLinks,
  categoriesLinks,
  customersLinks,
  employeesLinks,
  reportsLinks,
  suppliersLinks,
  branchesLinks,
  salesLinks,
  promotionsLinks,
  accountingLinks,
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

export { settingsLinks };

const routes: Route[] = [
  homeRoutes,
  dashboardRoutes,
  posRoutes,
  barcodeRoutes,
  settingsRoutes,
  productsRoutes,
  categoriesRoutes,
  customersRoutes,
  employeesRoutes,
  reportsRoutes,
  suppliersRoutes,
  branchesRoutes,
  salesRoutes,
  promotionsRoutes,
  accountingRoutes,
];

export default routes;
