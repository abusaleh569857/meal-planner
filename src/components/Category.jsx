import useCategory from "../hooks/useCategory";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const { categories, loading, error } = useCategory();
  return (
    <div>
      {loading ? (
        <div>loading....</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="grid grid-cols-4 gap-3 m-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat}></CategoryCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
