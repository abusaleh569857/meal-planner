import { useEffect, useState } from "react";
import ParseMeal from "../utils/ParseMeal";

const useRecipeDetails = (id) => {
  const [recipeDetails, setRecipedetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("details:", Array.isArray(recipeDetails));
  console.log("details:", recipeDetails);
  console.log("id :", id);

  useEffect(() => {
    let isMounted = true;
    const fetchRecipeDetails = async () => {
      console.log("id :", id);
      if (id) {
        try {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
          );
          const data = await res.json();
          const recipeDetailsData = data?.meals?.[0] || {};
          const parsedData = recipeDetailsData
            ? ParseMeal(recipeDetailsData)
            : {};
          console.log("data", parsedData);
          if (isMounted) {
            setRecipedetails(parsedData);
            setLoading(false);
          }
        } catch (e) {
          if (isMounted) {
            setError(e.message);
            setLoading(false);
          }
        }
      }
    };
    fetchRecipeDetails();
    return () => {
      isMounted = false;
    };
  }, [id]);
  return {
    recipeDetails,
    loading,
    error,
  };
};

export default useRecipeDetails;
