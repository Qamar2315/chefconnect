"use client"

import React, { useEffect, useState } from 'react';
import EditProfileForm from '@components/EditProfileForm'; // Assuming EditProfileForm is in the same directory
import axios from 'axios';

function Page({ params }) {
    const id = params.id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/users/${id}`);
                const userData = response.data;
                // Remove recipes and password fields
                delete userData.recipes;
                delete userData.password;
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        
        if (id) {
            fetchUser();
        }
    }, [id]);

    return (
        <div className='h-screen'>
            {user && <EditProfileForm user={user} />}
        </div>
    );
}

export default Page;
