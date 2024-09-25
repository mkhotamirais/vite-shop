export const url =
  import.meta.env.MODE === "development" ? import.meta.env.VITE_URL_DEV : import.meta.env.VITE_URL_PROD;
