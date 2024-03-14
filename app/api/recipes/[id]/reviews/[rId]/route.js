import dbConnect from '@utils/connectDB';
import Review from '@models/review';
import Recipe from '@models/recepie';
import { NextResponse } from 'next/server';

export async function DELETE(req,{params}) {
    const id = params.rId;
    try {
        await dbConnect();

        // Find the review by ID and pull it out from the recipe
        const review = await Review.findById(id);
        if (!review) {
            return NextResponse.json({
                message: "Review deleted sucessfully",
                recipe
            });
        }

        // Update the recipe by pulling out the review ID
        const recipe = await Recipe.findOneAndUpdate(
            { reviews: id },
            { $pull: { reviews: id } },
            { new: true }
        );

        if (!recipe) {
            return NextResponse.json({
                message: "Review deleted sucessfully",
                recipe
            });
        }

        // Save the updated recipe
        await recipe.save();

        // Delete the review
        await Review.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Review deleted sucessfully",
            recipe
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            error: "Failed to update recipe" // Provide a more informative error message
        });
    }
}