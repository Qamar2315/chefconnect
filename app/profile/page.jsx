import { options } from '@app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';

async function ProfilePage() {
  const session = await getServerSession(options);
  const {name,email,role}= session?.user;
  if (!session){
    redirect("/api/auth/signin?callbackUrl=/profile")
  }
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-white">
          Profile Information
        </h1>
        <div className="mt-8">
          <p className="text-2xl text-white"><strong>Name:</strong> {name}</p>
          <p className="text-2xl text-white"><strong>Email:</strong> {email}</p>
          <p className="text-2xl text-white"><strong>Role:</strong> {role}</p>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
