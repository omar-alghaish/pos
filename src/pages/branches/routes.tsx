import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import { FormattedMessage } from "react-intl";
import { MdLocationOn } from "react-icons/md";
import BranchLayout from "./layout/BranchLayout";
import BranchesList from "./pages/BranchesList";
import AddBranch from "./pages/AddBranch";

export const branchesLinks: Link = {
  path: "/branches",
  title: <FormattedMessage id="branches" defaultMessage="branches" />,
  state: "branches",
  icon: <MdLocationOn />,
  children: [
    {
      path: "branches/add-branch",
      title: <FormattedMessage id="addBranch" defaultMessage="Add Branch" />,
      state: "add-branch",
    },
    {
      path: "branches/branches-list",
      title: (
        <FormattedMessage id="branchesList" defaultMessage="branches List" />
      ),
      state: "branches-list",
    },
  ],
};

export const branchesRoutes: Route = {
  path: "branches",
  element: <BranchLayout />,
  state: "branches",
  children: [
    {
      path: "",
      element: <Navigate to="branches-list" replace />,
      state: "",
    },
    {
      path: "branches-list",
      element: <BranchesList />,
      state: "branches-list",
    },
    {
      path: "add-branch",
      element: <AddBranch />,
      state: "add-branch",
    },
  ],
};
