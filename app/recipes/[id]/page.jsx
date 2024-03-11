"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import Link from 'next/link';

function RecipePage({ params }) {
    const router = useRouter();
    const recipeId = params?.id;
    const [recipe, setRecipe] = useState(null);
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(`/api/auth/signin?callbackUrl=/recipes/${recipeId}`)
        }
    });

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`/api/recipes/${recipeId}`);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };
        fetchRecipe();
    }, [recipeId]);

    const handleBack = () => {
        router.back();
    };

    const deleteRecipe = async () => {
        // You can handle form submission here, e.g., send data to server
        try {
            const answer = confirm(`${session?.user?.name}, are you sure you want to delete the recipe?`)
            if(answer){
                const response = await axios.delete(`/api/recipes/${recipe._id}`);
                router.push('/recipes');
                alert("Recipe deleted sucessfully")
            }
        } catch (error) {
            alert('Error submitting recipe:', error)
            console.error('Error submitting recipe:', error);
            // Handle submission errors appropriately, e.g., display user feedback
        }
    };

    if (!recipe) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>);
    }

    return (
        <div className="container mx-auto px-4">
            <button className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md" onClick={handleBack}>Back</button>
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-700 mb-2">{recipe.description}</p>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="list-disc ml-6">{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Instructions</h2>
                <ol>
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="list-decimal ml-6">{instruction}</li>
                    ))}
                </ol>
            </div>
            <p className="mb-4"><span className='font-semibold' >Cooking Time: </span>{recipe.cookingTime} minutes</p>
            <p className="mb-4"><span className='font-semibold' >Servings: </span>{recipe.servings}</p>
            <p className="mb-4"><span className='font-semibold' >Author: </span> <Link href={`/profile/${recipe?.author?._id}`} >{recipe.author?.name}</Link></p>
            {recipe.category && <p className="mb-4"><span className='font-semibold' >Category: </span>
                {recipe.category}
            </p>}
            {recipe.tags.length > 0 && (
                <div className="mb-4">
                    <p className="font-semibold mb-2">Tags:</p>
                    <div className="flex flex-wrap">
                        {recipe.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 rounded-full px-2 py-1 text-sm mr-2 mb-2">{tag}</span>
                        ))}
                    </div>
                </div>
            )}
            {/* Conditionally render edit and delete buttons if user matches recipe author */}
            {recipe && recipe?.author?._id === session?.user?.user_id && (
                <div className="my-4">
                    <Link href={`/recipes/${recipe._id}/edit`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Edit
                    </Link>
                    <button onClick={() => { deleteRecipe(recipe._id); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default RecipePage;
