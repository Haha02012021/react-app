import { getProducts } from "../services/productServices";

export async function getProductsByFilter({
  page = 1,
  limit = 16,
  category = "",
  brands = [],
  free_shipping = false,
  rating,
  sort,
  order,
  searchKey = "",
  price_gte,
  price_lte,
}) {
  const products = await getProducts({
    free_shipping,
    rating,
    rating_glt: rating ? null : 0,
    _sort: sort ? sort : "popularity",
    _order: order ? order : "desc",
    price_gte,
    price_lte,
  });

  const filterProducts = products.filter((product) => {
    return (
      (!category || product.categories.includes(category)) &&
      (brands.length === 0 || brands.includes(product.brand)) &&
      (product.name.match(searchKey.toUpperCase()) ||
        product.description.match(searchKey.toUpperCase()) ||
        product.name.match(searchKey.toLowerCase()) ||
        product.description.match(searchKey.toLowerCase()) ||
        product.name.match(searchKey) ||
        product.description.match(searchKey))
    );
  });

  const pageProducts = filterProducts.slice(limit * (page - 1), limit * page);

  const total = Math.ceil(filterProducts.length / limit);

  return { pageProducts, total };
}
