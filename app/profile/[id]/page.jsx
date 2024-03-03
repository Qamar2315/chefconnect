"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

function ProfilePage({ params }) {
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
  
  console.log(session);

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
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-white">Profile Information</h1>
        <div className="mt-8">
          <p className="text-2xl text-white"><strong>Name:</strong> {userData.name}</p>
          <p className="text-2xl text-white"><strong>Email:</strong> {userData.email}</p>
          <h2 className="text-3xl font-bold mt-8 mb-4 text-white">User Recipes</h2>
          {userRecipes.length > 0 ? (
            <ul className="text-left">
              {userRecipes.map((recipe, index) => (
                <li key={index} className="text-xl text-white">{recipe.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xl text-white">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
