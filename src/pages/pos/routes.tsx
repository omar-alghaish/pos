import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import Pos from "./Index";
import { PiStorefrontLight } from "react-icons/pi";

export const posLinks: Link = {
  path: "pos",
  title: <FormattedMessage id="pos" defaultMessage="POS" />,
  state: "pos",
  icon: <PiStorefrontLight />,
};

export const posRoutes: Route = {
  path: "/:lang/pos",
  element: <Pos />,
  state: "pos",
};
