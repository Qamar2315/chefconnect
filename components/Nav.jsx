"use client"

import Link from 'next/link';
import Image from 'next/image';

function Nav() {
    const isUserLoggedIn = false;
    return (
        <nav className='w-full flex justify-between'>
            <Image
                src='/assets/logo.png'
                alt='logo'
                width={150}
                height={150}
            />
            <div className='w-full flex justify-end' >
                {
                    isUserLoggedIn ? (
                        <div className='w-1/3 flex justify-around mt-10'>
                            <Link href='/add-recipe' className='text-blue-500 hover:text-blue-700'>Add Recipe</Link>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href='/profile' className='text-blue-500 hover:text-blue-700'>Profile</Link>
                            <Link href='/logout' className='text-blue-500 hover:text-blue-700'>Logout</Link>
                        </div>
                    ) : (
                        <div className='w-1/3 flex justify-around  mt-10'>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href='/about' className='text-blue-500 hover:text-blue-700'>About Us</Link>
                            <Link href='/login' className='text-blue-500 hover:text-blue-700'>Sign Up</Link>
                            <Link href='/login' className='text-blue-500 hover:text-blue-700'>Login</Link>
                        </div>
                    )

                }
            </div>
        </nav>
    )
}

export default Nav