import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { id, name, thumb, category } = recipe;
  const navigate = useNavigate();

  const handleRecipedetails = (id) => {
    navigate(`/recipe-details/${id}`);
  };
  return (
    <div className="border-2 border-cyan-200 rounded-xl p-3">
      <h1>Name : {name}</h1>
      <img src={thumb} alt="" />
      <p>Category : {category}</p>

      <button
        type="submit"
        className=" w-full text-md py-3 px-5 bg-orange-400 font-medium hover:bg-orange-500 transition duration-300 ease-in-out"
        onClick={() => handleRecipedetails(id)}
      >
        Show Details
      </button>
    </div>
  );
};

export default RecipeCard;
