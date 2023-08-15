import { API_URL } from "../constants";

export async function getCategories() {
  const categories = await fetch(`${API_URL}categories`).then(
    (response) => response.json(),
  );

  return categories;
}
