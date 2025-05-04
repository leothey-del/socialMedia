import React, { useState, useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = ({ setIsOpen }) => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false); // Close mobile menu on logout
  };

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        </li>
      ) : (
        <>
          {/* ✅ MOBILE: Profile */}
          <li className="block sm:hidden">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Profile
            </NavLink>
          </li>

          {/* ✅ MOBILE: Settings */}
          <li className="block sm:hidden">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Settings
            </NavLink>
          </li>

          {/* ✅ MOBILE: Logout */}
          <li className="block sm:hidden">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-gray-300"
            >
              Logout
            </button>
          </li>

          {/* ✅ DESKTOP: Profile image + dropdown */}
          <li className="hidden sm:block relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-700 transition"
            >
              <img
                alt="Profile"
                src={user?.profilePicture || "https://via.placeholder.com/150"}
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors rounded-t-lg"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition-colors rounded-b-lg"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </>
      )}
    </>
  );
};

export default Logout;
