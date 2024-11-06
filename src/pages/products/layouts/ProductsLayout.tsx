import { Outlet } from "react-router-dom";
import Header from "../../../components/header/Index";
import DynamicBreadcrumb from "../../../components/common/dynamicBreadcrumb";

const ProductsLayout = () => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >

      <Header />
      <div className="breadcrumb_layout_container">
      <DynamicBreadcrumb />

      </div>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
