import { useState, useEffect, useCallback } from "react";
import "../styles/components/Pagination.scss";
import { DISPLAY_PAGINATION_ITEMS } from "../constants";

export default function Pagination({ total, currentPage, onChangePage }) {
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const renderPaginationItems = useCallback(() => {
    const paginationItems = [];

    let fromPage = 1;
    let toPage = total < DISPLAY_PAGINATION_ITEMS ? total : DISPLAY_PAGINATION_ITEMS;

    if (activePage >= DISPLAY_PAGINATION_ITEMS - 1) {
      const halfDisplayPaginationItems = Math.floor(DISPLAY_PAGINATION_ITEMS / 2)
      fromPage = activePage - halfDisplayPaginationItems;
      toPage = activePage + halfDisplayPaginationItems;

      if (activePage >= total - halfDisplayPaginationItems) {
        fromPage = total - (DISPLAY_PAGINATION_ITEMS - 1);
        toPage = total;
      }
    }

    while (fromPage <= toPage) {
      const paginationPage = fromPage;
      paginationItems.push(
        <li
          key={paginationPage}
          className={`pagination__item ${
            activePage === paginationPage ? "pagination__item--active" : ""
          }`}
          onClick={() => {
            handleChangePage(paginationPage);
          }}
        >
          <span className="pagination__link">{paginationPage}</span>
        </li>,
      );
      fromPage++;
    }

    return paginationItems;
  }, [activePage, total]);

  const handleChangePage = (page) => {
    if (page !== activePage) {
      setActivePage(page);
      onChangePage(page);
    }
  };

  const handlePre = () => {
    if (activePage > 1) {
      handleChangePage(activePage - 1);
    }
  };

  const handleNext = () => {
    if (activePage < total) {
      handleChangePage(activePage + 1);
    }
  };

  return (
    <>
      {total > 1 && (
        <ul className="pagination">
          {activePage != 1 && (
            <li
              onClick={handlePre}
              className="pagination__item pagination__item--pre"
            >
              <span className="pagination__link" aria-label="Previous">
                ‹
              </span>
            </li>
          )}
          {renderPaginationItems()}
          {activePage != total && (
            <li
              onClick={handleNext}
              className="pagination__item  pagination__item--next"
            >
              <a className="pagination__link" aria-label="Next">
                ›
              </a>
            </li>
          )}
        </ul>
      )}
    </>
  );
}
