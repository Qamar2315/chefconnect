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

export async function PUT(req, { params }) {
    const id = params.id;
    try {
        await dbConnect();
        let data = await req.json();
        const recipe = await Recipe.findByIdAndUpdate(id, data );
        if (recipe) {
            return NextResponse.json({
                message: "Recipe updated successfully",
                recipe
            });
        }else{
            return NextResponse.json({
                status: 404,
                error: "Recipe not found" // Provide a more informative error message
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            error: "Failed to update recipe" // Provide a more informative error message
        });
    }
}

export async function DELETE(req, { params }) {
    const id = params.id;
    try {
        await dbConnect();
        const recipe = await Recipe.findByIdAndDelete(id);
        if (recipe) {
            return NextResponse.json({
                message: "Recipe deleted sucessfully",
                recipe
            });
        }else{
            return NextResponse.json({
                status: 404,
                error: "Recipe not found" // Provide a more informative error message
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            error: "Failed to update recipe" // Provide a more informative error message
        });
    }
}