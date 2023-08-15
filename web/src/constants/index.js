export const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:3000/api/";

export const DISPLAY_TEXT_MAX_LENGTH = 60;

export const PRODUCT_SORT_OPTIONS = [
  {
    value: "featured",
    content: "Sort by featured",
  },
  {
    value: "price_asc",
    content: "Price ascending",
  },
  {
    value: "price_desc",
    content: "Price descending",
  },
];

export const LIMIT_OPTIONS = [
  {
    value: 16,
    content: "16 hits per page",
  },
  {
    value: 32,
    content: "32 hits per page",
  },
  {
    value: 64,
    content: "64 hits per page",
  },
];

export const DEFAULT_RATINGS = [
  {
    stars: 6,
  },
  {
    stars: 5,
  },
  {
    stars: 4,
  },
  {
    stars: 3,
  },
  {
    stars: 2,
  },
  {
    stars: 1,
  },
];

export const DISPLAY_PAGINATION_ITEMS = 5;
