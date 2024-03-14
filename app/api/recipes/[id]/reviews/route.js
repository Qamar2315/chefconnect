// pages/api/reviews.js
import dbConnect from '@utils/connectDB';
import Review from '@models/review';
import Recipe from '@models/recepie';
import { NextResponse } from 'next/server'

export async function POST(req, {params}) {
  try {
    await dbConnect();
    const id = params.id;
    let data = await req.json();
    // Use Mongoose's create method to save to database
    const newReview = await Review.create(
      data
    );
    let recipe = await  Recipe.findById(id);
    recipe.reviews.push(newReview);
    await recipe.save();
    await newReview.populate('author');
    return NextResponse.json({
      message: "Review created successfully",
      review: newReview // Optionally include the created recipe in the response
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Failed to create recipe" // Provide a more informative error message
    });
  }
}
