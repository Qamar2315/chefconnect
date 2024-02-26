// pages/api/recipes.js
import dbConnect from '@utils/connectDB';
import Recipe from '@models/recepie';
import { NextResponse } from 'next/server'

export async function GET(req, res) {
  try {
    await dbConnect();
    const recipes = await Recipe.find({});
    return NextResponse.json(
      recipes 
    )
  } catch (error) {
    console.error(error);
    return NextRespone.json(
      {
        status: 500
      }
    )
  }
}

export async function POST(req, res) {
  try {
    await dbConnect();
    const data = await req.json();
    const newRecipe = await Recipe.create(
      data
    ); // Use Mongoose's create method to save to database
    return NextResponse.json({
      message: "Recipe created successfully",
      recipe: newRecipe // Optionally include the created recipe in the response
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create recipe" // Provide a more informative error message
    });
  }
}