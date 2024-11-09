import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import { IoHomeOutline } from "react-icons/io5";
import Home from "./Index";

export const homeLinks: Link = {
  path: "home",
  title: <FormattedMessage id="home" defaultMessage="Home" />,
  state: "home",
  icon: <IoHomeOutline />,
};

export const homeRoutes: Route = {
  index: true,
  path: "/:lang/home",  // Use dynamic `:lang` in path
  element: <Home />,
  state: "home",
};
