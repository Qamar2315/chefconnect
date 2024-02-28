"use client"

import React, { useState, useEffect } from "react";
import RecipeCard from "../../components/RecipeCard";
import Link from 'next/link';
import Axios from 'axios';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await Axios.get("/api/recipes");
      const data = response.data;
      setRecipes(data);
    };

    fetchRecipes();
  
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Link key={recipe._id} href={`/recipes/${recipe._id}`} >
            <RecipeCard key={recipe._id} recipe={recipe} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recipes;