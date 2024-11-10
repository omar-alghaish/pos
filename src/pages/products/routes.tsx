import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import { BiStore } from "react-icons/bi";
import AddProduct from "./pages/AddProduct";
import { Navigate } from "react-router-dom";
import ProductsLayout from "./layouts/ProductsLayout";
import ProductsList from "./pages/ProductsTable";

export const productsLinks: Link = {
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
  ],
};

export const productsRoutes: Route = {
  path: "/:lang/products",
  element: <ProductsLayout />, 
  state: "products",
  children: [
    {
      path: "", 
      element: <Navigate to="products-list" replace />, 
      state: "",
    },
    {
      path: "products-list",
      element: <ProductsList />, 
      state: "products-list",
    },
    {
      path: "add-product",
      element: <AddProduct />, 
      state: "add-product",
    },
  ],
};
