import { API_URL } from "../constants";

export async function getProducts(query) {
  let queryStr = "";

  for (const key in query) {
    if (Object.hasOwnProperty.call(query, key)) {
      if (query[key]) {
        queryStr += key + "=" + query[key] + "&";
      }
    }
  }

  const products = await fetch(
    `${API_URL}products?${queryStr}`,
  ).then((response) => response.json());

  return products;
}
