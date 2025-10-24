import React from 'react';
import AuthStatus from './components/AuthStatus';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Autenticación Google Next.js 15
      </h1>
      <AuthStatus />
      <p className="mt-8 text-center text-sm text-gray-600">
        El estado de la sesión se gestiona con Auth.js y SessionWrapper.
      </p>
    </main>
  );
};

export default HomePage;