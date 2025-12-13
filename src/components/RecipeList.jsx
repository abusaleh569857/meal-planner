import RecipeCard from "./RecipeCard";

const RecipeList = ({ recipes }) => {
  console.log("recipe :", recipes);
  return (
    <div className="grid grid-cols-4 gap-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe}></RecipeCard>
      ))}
    </div>
  );
};

export default RecipeList;
