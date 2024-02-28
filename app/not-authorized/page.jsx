import React from 'react';

function NotAuthorizedPage() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-white">Not Authorized</h1>
        <p className="text-2xl text-white mt-4">Sorry, you are not authorized to access this page.</p>
      </div>
    </div>
  );
}

export default NotAuthorizedPage;
