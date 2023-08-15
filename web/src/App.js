import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProductsList from "./pages/ProductsList";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<ProductsList />} path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
