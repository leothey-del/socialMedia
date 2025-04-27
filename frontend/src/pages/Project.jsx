import React from 'react';
import ThreeScene from '../components/ThreeScene';

const Project = () => {
  return (
    <section id="projects" className="py-12 relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Projects</h2>
        <div className="grid gap-8 max-w-5xl mx-auto px-4">
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-105 transition-transform duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Project One</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A short description of your awesome project goes here. Built with React and Tailwind CSS!
              </p>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Project
              </a>
            </div>
          </div>
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 hover:scale-105 transition-transform duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Project Two</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Another great project description. Maybe something with Next.js, Node, or APIs!
              </p>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;