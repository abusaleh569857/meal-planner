const ParseMeal = (recipeData) => {
  const id = recipeData.idMeal;
  const name = recipeData.strMeal;
  const category = recipeData.strcategory;
  const area = recipeData.strArea;
  const thumb = recipeData.strMealThumb;
  const video = recipeData.strYoutube;
  const instruction = recipeData.strInstructions;

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = recipeData[`strIngredient${i}`];
    const measure = recipeData[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push({ name: ing.trim(), measure: measure.trim() });
    }
  }

  ingredients.map((ingredient) => {
    console.log("ing :", ingredient);
  });

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
