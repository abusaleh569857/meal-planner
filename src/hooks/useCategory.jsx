import React, { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        setCategories(data.categories);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    };
    fetchAllCategory();

    // return () => {
    //   second
    // }
  }, []);

  return { categories, loading, error };
};

export default useCategory;
