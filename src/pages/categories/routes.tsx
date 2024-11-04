import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import AddCategory from "./pages/AddCategory";
import CategoriesList from "./pages/CategoriesList";
import CategoriesLayout from "./layout/CategoriesLayout";
import { FormattedMessage } from "react-intl";
import { BiSolidCategoryAlt } from "react-icons/bi";

export const categoriesLinks: Link = {
  path: "/categories",
  title: <FormattedMessage id="categories" defaultMessage="categories" />,
  state: "categories",
  icon: <BiSolidCategoryAlt />,
  children: [
    {
      path: "categories/add-category",
      title: (
        <FormattedMessage id="addCategory" defaultMessage="Add New Category" />
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
};

export const categoriesRoutes: Route = {
  path: "categories",
  element: <CategoriesLayout />,
  state: "categories",
  children: [
    {
      path: "",
      element: <Navigate to="categories-list" replace />,
      state: "",
    },
    {
      path: "categories-list",
      element: <CategoriesList />,
      state: "categories-list",
    },
    {
      path: "add-category",
      element: <AddCategory />,
      state: "add-category",
    },
  ],
};
