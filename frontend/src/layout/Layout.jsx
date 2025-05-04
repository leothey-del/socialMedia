import React from "react";
import NavExample from "../components/NavExample"; // Changed to default import
import AppRoutes from "../routes/AppRoutes";
import { Footer } from "../components/Footer";

// Layout component that wraps the main content and includes the navigation and footer

const Layout = () => {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-y-scroll bg-gray-800 text-white">
      <NavExample />
      <main className="flex-1 w-full max-w-2xl px-8">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
