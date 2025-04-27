import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="flex flex-col items-center text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Hey there! I'm [Your Name]</h1>
          <p className="text-lg mb-6 max-w-xl">
            I'm a passionate Web Developer who loves building beautiful, responsive, and accessible web experiences. I specialize in React, Tailwind CSS, and modern frontend technologies.
          </p>
          <Link to="/project" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            View My Work
          </Link>
        </section>
      );
}

export default Home