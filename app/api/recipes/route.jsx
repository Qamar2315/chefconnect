// pages/api/recipes.js
import dbConnect from '../../../utils/connectDB';
import Recipe from '../../../models/recepie';

export async function GET(req, res) {
  try {
    dbConnect();
    const recipes = await Recipe.find({});
    return NextResponse.json(
      {
        data:recipes
      }
    )
  } catch (error) {
    console.error(error);
    return Respone.json(
      {
        status:500
      }
    )
  }
}