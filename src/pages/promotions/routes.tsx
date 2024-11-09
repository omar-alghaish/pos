import { Navigate } from "react-router-dom";
import { Link, Route } from "../../routes/types";
import AddPromotion from "./pages/AddPromotion";
import PromotionsList from "./pages/PromotionsList";
import PromotionsLayout from "./layout/PromotionsLayout";
import { FormattedMessage } from "react-intl";
import { BsPercent } from "react-icons/bs";

export const promotionsLinks: Link = {
  path: "/promotions",
  title: <FormattedMessage id="promotions" defaultMessage="Promotions & Discounts" />,
  state: "promotions",
  icon: <BsPercent />,
  children: [
    {
      path: "promotions/add-promotion",
      title: (
        <FormattedMessage id="addPromotion" defaultMessage="Add New Promotion" />
      ),
      state: "add-promotion",
    },
    {
      path: "promotions/promotions-list",
      title: (
        <FormattedMessage id="promotionsList" defaultMessage="Promotions List" />
      ),
      state: "promotions-list",
    },
  ],
};

export const promotionsRoutes: Route = {
  path: "/:lang/promotions",
  element: <PromotionsLayout />,
  state: "promotions",
  children: [
    {
      path: "",
      element: <Navigate to="promotions-list" replace />,
      state: "",
    },
    {
      path: "promotions-list",
      element: <PromotionsList />,
      state: "promotions-list",
    },
    {
      path: "add-promotion",
      element: <AddPromotion />,
      state: "add-promotion",
    },
  ],
};
