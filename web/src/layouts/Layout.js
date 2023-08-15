import Header from "../partials/layouts/Layout/Header";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

export const ProductFilterContext = createContext();

export default function Layout() {
  const [filter, setFilter] = useState({});

  return (
    <ProductFilterContext.Provider value={{ filter, setFilter }}>
      <Header />
      <Outlet />
    </ProductFilterContext.Provider>
  );
}
