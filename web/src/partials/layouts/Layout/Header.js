import { LogoIcon } from "../../../components/icons";
import "../../../styles/partials/layouts/Layout/Header.scss";
import SearchBox from "../../../components/SearchBox";
import { useContext } from "react";
import { ProductFilterContext } from "../../../layouts/Layout";

export default function Header() {
  const { setFilter } = useContext(ProductFilterContext);
  const handleChangeSearch = (event) => {
    const newSearchKey = event.target.value;

    setFilter((prev) => {
      return {
        ...prev,
        searchKey: newSearchKey,
      };
    });
  };

  return (
    <header className="header">
      <div className="header__logo">
        <LogoIcon />
      </div>
      <h1 className="header__title">Stop looking for an item — find it.</h1>
      <SearchBox onChange={handleChangeSearch} />
    </header>
  );
}
