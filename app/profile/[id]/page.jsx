"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import RecipeCard from '@components/RecipeCard';
import { redirect, useRouter } from 'next/navigation';

function ProfilePage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/api/auth/signin?callbackUrl=/profile/${id}`);
    }
  });

  const deleteRecipe = async (recipe) => {
    // You can handle form submission here, e.g., send data to server
    try {
      const answer = confirm(`${session?.user?.name}, are you sure you want to delete the recipe?`)
      if (answer) {
        const response = await axios.delete(`/api/recipes/${recipe._id}?author_id=${recipe?.author}`);
        // console.log(response.data);
        router.push('/recipes');
        alert("Recipe deleted sucessfully")
      }
    } catch (error) {
      alert('Error submitting recipe:', error)
      console.error('Error submitting recipe:', error.message);
      // Handle submission errors appropriately, e.g., display user feedback

    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUserData(response.data);
        setLoadingUser(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserRecipes = async () => {
      try {
        const response = await axios.get(`/api/recipes/user/${id}`);
        setUserRecipes(response.data);
        setLoadingRecipes(false);
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    if (id) {
      fetchUserData();
      fetchUserRecipes();
    }
  }, [id]);

  if (loadingUser || loadingRecipes) {
    return (
      <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-sky-400 to-indigo-400 h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-white">Profile Information</h1>
        <div className="mt-8">
          <p className="text-2xl text-white"><strong>Name:</strong> {userData.name}</p>
          <p className="text-2xl text-white"><strong>Email:</strong> {userData.email}</p>
          <br />
          {session && session.user.user_id === userData._id && (
            <Link href={`/profile/${session.user.user_id}/edit`} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-10">
              Edit Profile
            </Link>
          )}
          {userRecipes.length > 0 ? (
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8">{userData.name} Recipes</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userRecipes.map((recipe) => (
                  <div key={recipe._id}>
                    <Link href={`/recipes/${recipe._id}`} >
                      <RecipeCard key={recipe._id} recipe={recipe} />
                    </Link>
                    {
                      userData?._id === session?.user?.user_id && (
                        <button onClick={() => { deleteRecipe(recipe) }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                          Delete Recipe?
                        </button>
                      )
                    }
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xl text-white">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
