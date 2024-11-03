import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => (
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
);

export default NavLinks;
