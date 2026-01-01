import { useParams } from "react-router-dom";
import useRecipeDetails from "../hooks/useRecipeDetails";
import { useState } from "react";
import MealPlanModal from "../components/MealPlanModal";

const RecipeDetails = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { recipeDetails, loading } = useRecipeDetails(id);
  if (loading) {
    return <div>loading...</div>;
  }
  const { name, area, category, thumb, ingredients, instruction, video } =
    recipeDetails;
  console.log("recipe :", recipeDetails);

  return (
    <div>
      <div>
        <h1>Id : {id}</h1>
        <h1>{name}</h1>
        <h1>Category : {category}</h1>
        <h1>Area : {area}</h1>
        <p>Instruction : {instruction}</p>
        <div>
          <img src={thumb} alt="thumb" className="w-[350px]" />
        </div>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex justify-center items-center gap-3">
            <h1>Ingredient Name : {ing.name}</h1>
            <h1>Ingredient Measure : {ing.measure}</h1>
          </div>
        ))}
        <button
          type="submit"
          className=" w-full text-md py-3 px-5 bg-orange-400 font-medium hover:bg-orange-500 transition duration-300 ease-in-out"
          onClick={() => setOpen(true)}
        >
          Add to Meal
        </button>
        {open && (
          <div>
            <MealPlanModal recipeDetails={recipeDetails}></MealPlanModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
