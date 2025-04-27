import React, { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Project', href: '/project' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },

  ];

  return (
    <nav className=" top-0 left-0 w-full z-50  ">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center h-16">
        
            {/* Mobile Menu Button */}
            <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle menu"
          >
            {openMenu ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {links.map((data) => (
              <Link
                key={data.name}
                to={data.href}
                className="relative  text-gray-700 text-xl font-normal hover:text-blue-600 transition-colors duration-200 group"
              >
                {data.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
           
          </div>

             
          {/* <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MY APP
            </Link>
          </div> */}
         <DarkModeToggle />
        </div>
      </div>








      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden bg-white/90 backdrop-blur-md transition-all duration-300 ease-in-out ${openMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {links.map((data) => (
            <div
              key={data.name}
              className={`transition duration-300 transform ${openMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            >
              <Link
                to={data.href}
                className="block py-2 px-4 text-gray-700 text-lg font-medium hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setOpenMenu(false)}
              >
                {data.name}
              </Link>
            </div>
          ))}
          <div
            className={`transition duration-300 transform ${openMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
          >
            <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 text-base font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
