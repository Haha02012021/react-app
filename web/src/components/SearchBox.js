import { useState, useEffect } from "react";
import { LoadingIcon, ResetIcon, SearchIcon } from "./icons";
import "../styles/components/SearchBox.scss";

export default function SearchBox({
  inputPlaceholder = "Product, brand, color, …",
  searchIconSize,
  onChange,
  forceReset = false,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (forceReset) {
      console.log("force");
      onChange({
        target: {
          value: "",
        },
      });
      setValue("");
    }
  }, [forceReset]);
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(event);
  };

  const handleReset = (event) => {
    setValue("");

    onChange(event);
  };

  return (
    <div className="search-box">
      <form className="search-box__form" noValidate="" onReset={handleReset}>
        <input
          className="search-box__input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={inputPlaceholder}
          spellCheck="false"
          maxLength="512"
          type="search"
          value={value}
          onChange={handleChange}
        />
        <button
          className="search-box__submit"
          type="submit"
          title="Submit the search query"
        >
          <SearchIcon size={searchIconSize} />
        </button>
        <button
          className={`search-box__reset${
            value && " search-box__reset--active"
          }`}
          type="reset"
          title="Clear the search query"
          hidden=""
        >
          <ResetIcon />
        </button>
        <span className="search-box__loading" hidden>
          <LoadingIcon />
        </span>
      </form>
    </div>
  );
}
