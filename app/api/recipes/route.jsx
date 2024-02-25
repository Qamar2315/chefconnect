// pages/api/recipes.js
import dbConnect from '../../../utils/connectDB';
import Recipe from '../../../models/recepie';
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