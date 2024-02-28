import React from 'react';
import UserForm from '@components/UserForm';

function page() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-center px-4 py-16">
      <UserForm>
      </UserForm>
    </div>
  )
}

export default page;