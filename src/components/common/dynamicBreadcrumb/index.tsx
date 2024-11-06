import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../breadcrumb";

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation();

  // Extract the path segments from the URL
  const path = location.pathname.split("/").filter((segment) => segment);

  return <Breadcrumb path={path} />;
};

export default DynamicBreadcrumb;
