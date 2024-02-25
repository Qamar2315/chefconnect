"use client"

import Link from 'next/link';
import Image from 'next/image';

function Nav() {
    const isUserLoggedIn = true;
    return (
        <nav className='w-full flex justify-between'>
            <Link href='/' >
                <Image
                    src='/assets/logo.png'
                    alt='logo'
                    width={100}
                    height={100}
                    priority
                />
            </Link>
            <div className='w-full flex justify-end' >
                {
                    isUserLoggedIn ? (
                        <div className='w-1/3 flex justify-around mt-10'>
                            <Link href='/recipes/add' className='text-blue-500 hover:text-blue-700'>Add Recipe</Link>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href='/profile' className='text-blue-500 hover:text-blue-700'>Profile</Link>
                            <Link href='/logout' className='text-blue-500 hover:text-blue-700'>Logout</Link>
                        </div>
                    ) : (
                        <div className='w-1/3 flex justify-around  mt-10'>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href='/about' className='text-blue-500 hover:text-blue-700'>About Us</Link>
                            <Link href='/sign-up' className='text-blue-500 hover:text-blue-700'>Sign Up</Link>
                            <Link href='/login' className='text-blue-500 hover:text-blue-700'>Login</Link>
                        </div>
                    )

                }
            </div>
        </nav>
    )
}

export default Nav