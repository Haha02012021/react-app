import { useState, useEffect, useContext, memo } from "react";
import ContainerHeader from "../../../components/ContainerHeader";
import Select from "../../../components/Select";
import ProductCard from "../../../components/ProductCard";
import Pagination from "../../../components/Pagination";
import { getProductsByFilter } from "../../../utils/products";
import { ProductFilterContext } from "../../../layouts/Layout";
import "../../../styles/partials/pages/ProductsList/ProductCards.scss";
import { LIMIT_OPTIONS, PRODUCT_SORT_OPTIONS } from "../../../constants";

function ProductCards() {
  const { filter, setFilter } = useContext(ProductFilterContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllProducts();
  }, [currentPage, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const getAllProducts = async () => {
    const { pageProducts, total } = await getProductsByFilter({
      page: currentPage,
      category: filter.category,
      brands: filter.brands,
      free_shipping: filter.freeShipping,
      rating: filter.rating,
      sort: filter.sort,
      order: filter.order,
      limit: filter.limit,
      searchKey: filter.searchKey,
      price_lte: filter.priceLte,
      price_gte: filter.priceGte,
    });

    setProducts(pageProducts);
    setTotal(total);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangeSort = (event) => {
    const sortCondition = event.target.value.split("_");

    setFilter((prev) => {
      return {
        ...prev,
        sort: sortCondition[0],
        order: sortCondition[1] ? sortCondition[1] : "s",
      };
    });
  };

  const handleChangeLimit = (event) => {
    setFilter((prev) => {
      return {
        ...prev,
        limit: event.target.value,
      };
    });
  };

  return (
    <div className="product-cards">
      <ContainerHeader>
        <Select onChange={handleChangeSort} options={PRODUCT_SORT_OPTIONS} />
        <Select onChange={handleChangeLimit} options={LIMIT_OPTIONS} />
      </ContainerHeader>
      <ul className="product-cards__list">
        {products?.map((product, index) => {
          return (
            <ProductCard
              key={index}
              name={product?.name}
              categoryName={product.categories[0]}
              price={product?.price}
              image={product?.image}
              description={product?.description}
              rating={product?.rating}
              markText={filter.searchKey ? filter.searchKey : ""}
            />
          );
        })}
      </ul>
      <div className="product-cards__pagination">
        <Pagination
          total={total}
          currentPage={currentPage}
          onChangePage={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  );
}

export default memo(ProductCards);
