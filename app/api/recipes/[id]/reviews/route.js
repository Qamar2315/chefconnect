import dbConnect from '@utils/connectDB';
import Recipe from '@models/recepie';
import { NextResponse } from 'next/server';

export async function GET(req, {params}) {
    const id= params.id;
    try {
        await dbConnect();
        const recipe = await Recipe.findById(id);
        await recipe.populate("author");
        if (!recipe) {
            return NextResponse.json({
                status: 404,
                message: 'Recipe not found',
            });
        }
        return NextResponse.json(recipe);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: 'Internal server error',
        });
    }
}