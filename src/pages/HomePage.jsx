import useCategory from "../hooks/useCategory";

const HomePage = () => {
  const { categories, loading, error } = useCategory();
  console.log(categories);
  return (
    <div>
      <h1>homepage</h1>
    </div>
  );
};

export default HomePage;
