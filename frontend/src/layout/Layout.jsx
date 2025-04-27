import React from 'react';
import Navbar from '../components/Navbar';
import AppRoutes from '../routes/AppRoutes';
import { Footer } from '../components/Footer';

export const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-2xl px-8 ">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
