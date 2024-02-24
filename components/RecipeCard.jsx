import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>
        <div className="flex items-center mt-4">
          <span className="text-gray-500 mr-2">Cooking Time:</span>
          <span>{recipe.cookingTime} minutes</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-gray-500 mr-2">Servings:</span>
          <span>{recipe.servings}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;