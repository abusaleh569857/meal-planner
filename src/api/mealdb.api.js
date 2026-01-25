import axiosClient from "./axiosClient";

export const getSearchResult = (query) => {
  return axiosClient.get(`/search.php?s=${query}`);
};

export const getAllCategories = () => {
  return axiosClient.get("/categories.php");
};

export const getRecipeDetails = (id) => {
  return axiosClient.get(`lookup.php?i=${id}`);
};

export const filterByCategory = (category) => {
  return axiosClient.get(`filter.php?c=${category}`);
};
