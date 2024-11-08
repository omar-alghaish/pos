import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import AddEmployee from "./pages/AddEmployee";
import AddRole from "./pages/AddRole";
import EmployeesList from "./pages/EmployeesList";
import RolesList from "./pages/RolesList";
import EmployeesLayout from "./layout/EmployeessLayout";
import { FaUserTie } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";
import PosSessions from "./pages/PosSessions";
import Shifts from "./pages/Shifts";

export const employeesLinks: Link = {
  path: "/employees",
  title: <FormattedMessage id="employees" defaultMessage="Employees" />,
  state: "employees",
  icon: <HiUserGroup />,
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
    {
      path: "/employees/pos-sessions",
      title: (
        <FormattedMessage id="posSessions" defaultMessage="Pos Sessions" />
      ),
      state: "employee-pos-sessions",
      icon: <FaUserTie />,
    },
    {
      path: "/employees/shifts",
      title: <FormattedMessage id="shifts" defaultMessage="Shifts" />,
      state: "shifts",
      icon: <FaUserTie />,
    },
  ],
};

export const employeesRoutes: Route = {
  path: "employees",
  element: <EmployeesLayout />,
  state: "employees",
  children: [
    {
      path: "",
      element: <Navigate to="employee-list" replace />,
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
    {
      path: "pos-sessions",
      element: <PosSessions />,
      state: "pos-sessions",
    },
    {
      path: "shifts",
      element: <Shifts />,
      state: "shifts",
    },
  ],
};
