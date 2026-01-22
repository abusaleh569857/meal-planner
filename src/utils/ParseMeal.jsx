const ParseMeal = (recipeData) => {
  const id = recipeData.idMeal;
  const name = recipeData.strMeal;
  const category = recipeData.strCategory;
  const area = recipeData.strArea;
  const thumb = recipeData.strMealThumb;
  const video = recipeData.strYoutube;
  const instruction = recipeData.strInstructions;

  const ingredients = [];
  const ingredientsLength = Object.keys(recipeData).filter((key) =>
    key.startsWith("strIngredient")
  ).length;

  for (let i = 1; i <= ingredientsLength; i++) {
    const ing = recipeData[`strIngredient${i}`];
    const measure = recipeData[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push({ name: ing.trim(), measure: measure.trim() });
    }
  }

  return {
    id,
    name,
    category,
    area,
    thumb,
    video,
    instruction,
    ingredients,
  };
};

export default ParseMeal;
