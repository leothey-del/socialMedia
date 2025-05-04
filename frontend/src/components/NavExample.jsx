import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

const NavbarItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "MyFeed", path: "/myfeed" },
  { name: "Feed", path: "/feed" },
];

export const NavExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 w-full">
      <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
        <div className="text-xl font-bold">MyApp</div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent space-y-2 md:space-y-0 md:space-x-4 p-4 md:p-0 transition-all duration-300 items-center`}
        >
          {NavbarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* ✅ Now Logout handles Login/Profile/Settings/Logout */}
          <Logout setIsOpen={setIsOpen} />
        </ul>
      </div>
    </nav>
  );
};

export default NavExample;
