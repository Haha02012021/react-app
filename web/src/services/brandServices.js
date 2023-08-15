import { API_URL } from "../constants";

export async function getBrands() {
  const brands = await fetch(`${API_URL}brands`).then((response) =>
    response.json(),
  );

  return brands;
}
