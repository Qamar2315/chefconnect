// pages/api/recipes.js
import dbConnect from '@utils/connectDB';
import Recipe from '@models/recepie';
import User from '@models/user';
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
    let data = await req.json();
    let user = await User.findOne({ email: data.userData.email });

    if (!user) {
      return NextResponse.json({
        status: 500,
        error: "User Not Found" // Provide a more informative error message
      });
    }

    data.formData.author = user._id;
    // Use Mongoose's create method to save to database

    const newRecipe = await Recipe.create(
      data.formData
    );
    
    user.recipes.push(newRecipe);
    await user.save();

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