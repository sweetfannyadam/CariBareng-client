import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => (
  <>
    <img src='caribareng.png' alt='logo cari bareng' className='w-20 mr-10 shadow-md bg-white p-2 rounded-t-2xl rounded-l-2xl'/>
    <ul className="flex-grow flex justify-start space-x-4">
      <li>
        <Link
          to="/"
          className="group flex items-center text-white transition-colors duration-300 ease-in-out hover:text-black"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/about-us"
          className="group flex items-center text-white transition-colors duration-300 ease-in-out hover:text-black"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="group flex items-center text-white transition-colors duration-300 ease-in-out hover:text-black"
        >
          Contact
        </Link>
      </li>
    </ul>
  </>
);

export default NavLinks;
