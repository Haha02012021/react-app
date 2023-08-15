import Sidebar from "../partials/pages/ProductsList/Sidebar";
import ProductCards from "../partials/pages/ProductsList/ProductCards";
import { memo } from "react";

function ProductsList() {
  return (
    <div className="container">
      <Sidebar />
      <ProductCards />
    </div>
  );
}

export default memo(ProductsList);
