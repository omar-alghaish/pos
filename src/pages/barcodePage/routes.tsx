import { FormattedMessage } from "react-intl";
import { Link, Route } from "../../routes/types";
import { BsUpcScan } from "react-icons/bs";
import BarcodePage from ".";

export const barcodePageLinks: Link = {
  path: "/barcode-scanner",
  title: (
    <FormattedMessage id="barcode-scanner" defaultMessage="barcode scanner" />
  ),
  state: "barcode-scanner",
  icon: <BsUpcScan />,
};

export const barcodeRoutes: Route = {
  path: "barcode-scanner",
  element: <BarcodePage />,
  state: "pos",
};
