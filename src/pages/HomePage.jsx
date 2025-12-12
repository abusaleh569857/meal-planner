import Category from "../components/Category";
import SearchBar from "../components/SearchBar";
import useCategory from "../hooks/useCategory";

const HomePage = () => {
  //   const { categories, loading, error } = useCategory();
  //   console.log(categories);
  return (
    <div>
      <SearchBar></SearchBar>
      <Category></Category>
    </div>
  );
};

export default HomePage;
