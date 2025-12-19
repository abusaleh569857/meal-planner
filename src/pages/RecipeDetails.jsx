import { useParams } from "react-router-dom";
import useRecipeDetails from "../hooks/useRecipeDetails";

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipeDetails } = useRecipeDetails(id);
  return (
    <div>
      <h1>Id : {id}</h1>
      <h1>{recipeDetails.name}</h1>
    </div>
  );
};

export default RecipeDetails;
