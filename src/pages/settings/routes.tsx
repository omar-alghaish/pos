import { Navigate } from "react-router-dom";
import ApiKeys from "./pages/ApiKeys";
import Webhooks from "./pages/Webhooks";
import Developer from "./layouts/Developer";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Password from "./pages/Password";
import Security from "./layouts/Security";
import Appearance from "./pages/Appearance";
import General from "./pages/General";
import Profile from "./pages/Profile";
import MyAccount from "./layouts/MyAccount";
import Layout from "./layouts/Layout";
import { FormattedMessage } from "react-intl";
import {
  FaClipboardList,
  FaLock,
  FaPalette,
  FaTools,
  FaUserShield,
} from "react-icons/fa";
import { Link, Route } from "../../routes/types";

export const settingsLinks: Link[] = [
  {
    path: "/my-account",
    title: <FormattedMessage id="my-account" defaultMessage="My account" />,
    state: "my-account",
    icon: <FaClipboardList />,
    children: [
      {
        path: "/settings/my-account/profile",
        title: <FormattedMessage id="profile" defaultMessage="profile" />,
        state: "profile",
      },
      {
        path: "/settings/my-account/general",
        title: <FormattedMessage id="general" defaultMessage="General" />,
        state: "general",
        icon: <FaTools />,
      },
      {
        path: "/settings/my-account/appearance",
        title: <FormattedMessage id="appearance" defaultMessage="Appearance" />,
        state: "appearance",
        icon: <FaPalette />,
      },
    ],
  },
  {
    path: "/settings/security",
    title: <FormattedMessage id="security" defaultMessage="Security" />,
    state: "security",
    icon: <FaLock />,
    children: [
      {
        path: "/settings/security/password",
        title: <FormattedMessage id="add-password" defaultMessage="Password" />,
        state: "password",
      },
      {
        path: "/settings/security/two-factor-auth",
        title: (
          <FormattedMessage
            id="two-factor-auth"
            defaultMessage="Two Factor Auth"
          />
        ),
        state: "two-factor-auth",
      },
    ],
  },
  {
    path: "/settings/developer",
    title: <FormattedMessage id="developer" defaultMessage="Developer" />,
    state: "developer",
    icon: <FaUserShield />,
    children: [
      {
        path: "/settings/developer/webhooks",
        title: <FormattedMessage id="webhooks" defaultMessage="Webhooks" />,
        state: "webhooks",
      },
      {
        path: "/settings/developer/api-keys",
        title: <FormattedMessage id="api-keys" defaultMessage="API Keys" />,
        state: "api-keys",
      },
    ],
  },
];

export const settingsRoutes: Route = {
  path: "settings",
  element: <Layout />,
  state: "settings",
  children: [
    {
      path: "",
      element: <Navigate to="my-account" replace />,
      state: "",
    },
    {
      path: "my-account",
      element: <MyAccount />,
      state: "my-account",
      children: [
        {
          path: "",
          element: <Navigate to="profile" replace />,
          state: "",
        },
        {
          path: "profile",
          element: <Profile />,
          state: "profile-settings",
        },
        {
          path: "general",
          element: <General />,
          state: "general",
        },
        {
          path: "appearance",
          element: <Appearance />,
          state: "appearance",
        },
      ],
    },
    {
      path: "security",
      element: <Security />,
      state: "security",
      children: [
        {
          path: "",
          element: <Navigate to="password" replace />,
          state: "",
        },
        {
          path: "password",
          element: <Password />,
          state: "password",
        },
        {
          path: "two-factor-auth",
          element: <TwoFactorAuth />,
          state: "two-factor-auth",
        },
      ],
    },
    {
      path: "developer",
      element: <Developer />,
      state: "developer",
      children: [
        {
          path: "",
          element: <Navigate to="webhooks" replace />,
          state: "",
        },
        {
          path: "webhooks",
          element: <Webhooks />,
          state: "webhooks",
        },
        {
          path: "api-keys",
          element: <ApiKeys />,
          state: "api-keys",
        },
      ],
    },
  ],
};
