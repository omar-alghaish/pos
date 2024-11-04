import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import InvoicesList from "./pages/InvoicesList";
import AddInvoice from "./pages/AddInvoice";
import ExpensesList from "./pages/ExpensesList";
import AddExpense from "./pages/AddExpense";
import FinancialReports from "./pages/FinancialReports";
import AccountingLayout from "./layout/AccountingLayout";
import { FormattedMessage } from "react-intl";
import { MdOutlineAccountBalance } from "react-icons/md";

export const accountingLinks: Link = {
  path: "/accounting",
  title: <FormattedMessage id="accounting" defaultMessage="Accounting" />,
  state: "accounting",
  icon: <MdOutlineAccountBalance />,
  children: [
    {
      path: "accounting/invoices-list",
      title: (
        <FormattedMessage id="invoicesList" defaultMessage="Invoices List" />
      ),
      state: "invoices-list",
    },
    {
      path: "accounting/add-invoice",
      title: <FormattedMessage id="addInvoice" defaultMessage="Add Invoice" />,
      state: "add-invoice",
    },
    {
      path: "accounting/expenses-list",
      title: (
        <FormattedMessage id="expensesList" defaultMessage="Expenses List" />
      ),
      state: "expenses-list",
    },
    {
      path: "accounting/add-expense",
      title: <FormattedMessage id="addExpense" defaultMessage="Add Expense" />,
      state: "add-expense",
    },
    {
      path: "accounting/financial-reports",
      title: (
        <FormattedMessage
          id="financialReports"
          defaultMessage="Financial Reports"
        />
      ),
      state: "financial-reports",
    },
  ],
};

export const accountingRoutes: Route = {
  path: "accounting",
  element: <AccountingLayout />,
  state: "accounting",
  children: [
    {
      path: "",
      element: <Navigate to="invoices-list" replace />,
      state: "",
    },
    {
      path: "invoices-list",
      element: <InvoicesList />,
      state: "invoices-list",
    },
    {
      path: "add-invoice",
      element: <AddInvoice />,
      state: "add-invoice",
    },
    {
      path: "expenses-list",
      element: <ExpensesList />,
      state: "expenses-list",
    },
    {
      path: "add-expense",
      element: <AddExpense />,
      state: "add-expense",
    },
    {
      path: "financial-reports",
      element: <FinancialReports />,
      state: "financial-reports",
    },
  ],
};
