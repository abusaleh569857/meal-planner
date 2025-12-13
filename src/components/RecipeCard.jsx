import React from "react";

const RecipeCard = ({ recipe }) => {
  const { id, name, thumb , category } = recipe;
  return (
    <div className="border-2 border-cyan-200 rounded-xl p-3">
      <h1>Name : {name}</h1>
      <img src={thumb} alt="" />
      <p>Category : {category}</p>
    </div>
  );
};

export default RecipeCard;
