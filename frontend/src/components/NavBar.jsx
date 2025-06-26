import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { Home, Rss } from "lucide-react";

const NavbarItems = [
  { name: "MyFeed", path: "/myfeed", icon: <Home className="inline w-5 h-5 mr-1" /> },
  { name: "Feed", path: "/feed", icon: <Rss className="inline w-5 h-5 mr-1" /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 w-full">
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
        {/* Logo on the left */}
        <div className="text-xl font-bold">MyApp</div>
        {/* Centered nav links */}
        <div className="flex-1 flex justify-center">
          <ul
            className={`$${
              isOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 items-center justify-center`}
          >
            {NavbarItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                      isActive ? "bg-blue-600 text-white" : "text-gray-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {/* Hide text on small screens, show on md+ */}
                  <span className="hidden md:inline">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Profile/Logout on the right */}
        <div className="flex items-center">
          <Logout setIsOpen={setIsOpen} />
          <button
            className="md:hidden text-2xl focus:outline-none ml-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
