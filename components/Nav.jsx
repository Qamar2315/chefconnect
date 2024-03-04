import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { options } from '@app/api/auth/[...nextauth]/options';

async function Nav() {
    const session = await getServerSession(options);
    console.log(session);
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
                    session ? (
                        <div className='w-1/3 flex justify-around mt-10'>
                            <Link href='/recipes/add' className='text-blue-500 hover:text-blue-700'>Add Recipe</Link>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href={`/profile/${session.user.user_id}`} className='text-blue-500 hover:text-blue-700'>Profile</Link>
                            <Link href='/api/auth/signout?callbackUrl=/' className='text-blue-500 hover:text-blue-700'>Logout</Link>
                        </div>
                    ) : (
                        <div className='w-1/3 flex justify-around  mt-10'>
                            <Link href='/recipes' className='text-blue-500 hover:text-blue-700'>Recipes</Link>
                            <Link href='/about' className='text-blue-500 hover:text-blue-700'>About Us</Link>
                            <Link href='/sign-up' className='text-blue-500 hover:text-blue-700'>Sign Up</Link>
                            <Link href='/api/auth/signin' className='text-blue-500 hover:text-blue-700'>Login</Link>
                        </div>
                    )

                }
            </div>
        </nav>
    )
}

export default Nav