import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import { FormattedMessage } from "react-intl";
import { MdLocalShipping } from "react-icons/md";
import SuppliersLayout from "./layout/SuppliersLayout";
import AddSupplier from "./pages/AddSupplier";
import SuppliersList from "./pages/SuppliersList";

export const suppliersLinks: Link = {
  path: "/suppliers",
  title: <FormattedMessage id="suppliers" defaultMessage="suppliers" />,
  state: "suppliers",
  icon: <MdLocalShipping />,
  children: [
    {
      path: "suppliers/add-supplier",
      title: (
        <FormattedMessage id="addSupplier" defaultMessage="Add Supplier" />
      ),
      state: "add-supplier",
    },
    {
      path: "suppliers/suppliers-list",
      title: (
        <FormattedMessage id="suppliersList" defaultMessage="Supplier List" />
      ),
      state: "suppliers-list",
    },
  ],
};

export const suppliersRoutes: Route = {
  path: "/:lang/suppliers",
  element: <SuppliersLayout />,
  state: "suppliers",
  children: [
    {
      path: "",
      element: <Navigate to="suppliers-list" replace />,
      state: "",
    },
    {
      path: "suppliers-list",
      element: <SuppliersList />,
      state: "suppliers-list",
    },
    {
      path: "add-supplier",
      element: <AddSupplier />,
      state: "add-supplier",
    },
  ],
};
