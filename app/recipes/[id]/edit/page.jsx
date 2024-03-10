"use client"

import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import EditRecipieForm from '@components/EditRecipieForm';

function page({ params }) {
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

	if (recipe) {
		if (session?.user?.user_id) {
			if (session?.user?.user_id !== recipe?.author._id) {
				redirect("/not-authorized")
			}
		}
	}

	const handleBack = () => {
		router.back();
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
		<div className='h-full'>
			<button className="mb-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md" onClick={handleBack}>Back</button>
			{recipe && <EditRecipieForm recipe={recipe} />}
		</div>
	)
}

export default page