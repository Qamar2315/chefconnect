import dbConnect from '@utils/connectDB';
import Recipe from '@models/recepie';
import { NextResponse } from 'next/server'

export async function PUT(req, { params }) {
    const id = params.id;
    try {
        await dbConnect();
        let data = await req.json();
        console.log(data);
        const recipe = await Recipe.findByIdAndUpdate(id, { data });
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
