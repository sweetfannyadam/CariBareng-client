import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-transparent p-4">
      <nav className="flex justify-between items-center mt-2 text-[13px] font-bold">
        <ul className="flex-grow flex justify-start space-x-4">
          <li>
            <Link
              to="/"
              className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/auth"
              className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            >
              <span className="relative">
                Login
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/auth"
              className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            >
              <span className="relative">
                Sign Up
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
