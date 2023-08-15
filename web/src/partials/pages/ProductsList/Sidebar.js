import { memo, useContext, useEffect, useState } from "react";
import ContainerHeader from "../../../components/ContainerHeader";
import Rating from "../../../components/Rating";
import SidebarList from "../../../components/SidebarList";
import Switch from "../../../components/Switch";
import ReloadIcon from "../../../components/icons/ReloadIcon";
import { getCategories } from "../../../services/categoryServices";
import { getProducts } from "../../../services/productServices";
import { getBrands } from "../../../services/brandServices";
import { ProductFilterContext } from "../../../layouts/Layout";
import RangeInput from "../../../components/RangeInput";
import "../../../styles/partials/pages/ProductsList/Sidebar.scss"
import { DEFAULT_RATINGS } from "../../../constants";

function Sidebar() {
  const { filter, setFilter } = useContext(ProductFilterContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [priceRange, setPriceRange] = useState({
    min: 1,
    max: 100,
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await getAllCategories();
      await getAllBrands();
      getALlRatings();
      getPriceRange();
    };

    if (products.length > 0) {
      getData();
    }
  }, [products]);

  const getAllProducts = async () => {
    const products = await getProducts();

    setProducts(products);
  };

  const getAllCategories = async () => {
    const categories = (await getCategories()).map((category) => {
      const amount = products.filter((product) =>
        product?.categories?.includes(category.content),
      )?.length;

      return {
        ...category,
        amount,
        children: category.children.map((c) => {
          const a = products.filter((product) =>
            product?.categories?.includes(c.content),
          )?.length;

          return {
            ...c,
            amount: a,
          };
        }),
      };
    });

    setCategories(categories);
  };

  const getAllBrands = async () => {
    const brands = (await getBrands()).map((brand) => {
      const amount = products.filter(
        (product) => product?.brand === brand.content,
      )?.length;

      return {
        ...brand,
        amount,
      };
    });

    setBrands(brands.sort((a, b) => b.amount - a.amount));
  };

  const getALlRatings = () => {
    const ratings = DEFAULT_RATINGS.map((rating) => {
      const amount = products.filter(
        (product) => product.rating === rating.stars,
      ).length;

      return {
        ...rating,
        amount,
      };
    });

    setRatings(ratings);
  };

  const getPriceRange = () => {
    const productsSortByPrice = products.sort((a, b) => b.price - a.price);

    setPriceRange({
      max: Math.ceil(productsSortByPrice[0].price),
      min: Math.floor(
        productsSortByPrice[productsSortByPrice.length - 1].price,
      ),
    });
  };

  const handleChangeCategory = (selectedCategory) => {
    setFilter((prev) => {
      return {
        ...prev,
        category: selectedCategory[0],
      };
    });
  };

  const handleChangeBrands = (selectedBrands) => {
    setFilter((prev) => {
      return {
        ...prev,
        brands: selectedBrands,
      };
    });
  };

  const handleFreeShipping = (event) => {
    setFilter((prev) => {
      return {
        ...prev,
        freeShipping: event.target.checked,
      };
    });
  };

  const handleRating = (stars) => {
    setFilter((prev) => {
      return {
        ...prev,
        rating: stars,
      };
    });
  };

  const handleChangePriceRange = (newPriceRange) => {
    setFilter((prev) => {
      return {
        ...prev,
        ...newPriceRange,
      };
    });
  };

  const handleClearFilter = () => {
    setFilter({});
  };

  return (
    <div className="sidebar">
      <ContainerHeader title="Filter">
        <span onClick={handleClearFilter} className="sidebar__clear">
          <span>
            <ReloadIcon />
          </span>
          <span>Clear filters</span>
        </span>
      </ContainerHeader>
      <div className="sidebar__lists">
        {categories.length > 0 && (
          <SidebarList
            title="Category"
            list={categories}
            defaultSelectedItems={[filter.category]}
            onChange={handleChangeCategory}
          />
        )}
        {brands.length > 0 && (
          <SidebarList
            title="Brands"
            list={brands}
            defaultSelectedItems={filter.brands}
            hasSearch={true}
            type="checkbox"
            onChange={handleChangeBrands}
          />
        )}
        <div className="sidebar-list">
          <h3 className="sidebar-list__title">Price</h3>
          <div className="sidebar-list__price">
            <RangeInput
              min={priceRange.min}
              max={priceRange.max}
              defaultLeftNow={
                filter.priceGte ? filter.priceGte : priceRange.min
              }
              defaultRightNow={
                filter.priceLte ? filter.priceLte : priceRange.max
              }
              onChange={handleChangePriceRange}
            />
          </div>
        </div>
        <div className="sidebar-list">
          <h3 className="sidebar-list__title">Free Shipping</h3>
          <div>
            <label
              className="sidebar-list__free-shipping"
              htmlFor="free_shipping"
            >
              <Switch
                defaultChecked={filter.freeShipping}
                id="free_shipping"
                onSwitch={handleFreeShipping}
              />
              <span>Display only items with free shipping</span>
            </label>
          </div>
        </div>
        <div className="sidebar-list">
          <h3 className="sidebar-list__title">Ratings</h3>
          <div>
            {ratings.map((rating) => (
              <Rating
                key={rating.stars}
                amount={rating.amount}
                stars={rating.stars}
                onRating={handleRating}
                isActive={rating.stars === filter.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
