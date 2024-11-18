import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => (
  <ul className="flex justify-between gap-5">
    <li>
      <Link
        to="/auth"
        className="group flex items-center text-white transition-colors duration-300 ease-in-out hover:text-black"
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
        className="group flex items-center text-white transition-colors duration-300 ease-in-out hover:text-black"
      >
        <span className="relative">
          Sign Up
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
        </span>
      </Link>
    </li>
  </ul>
);

export default AuthButtons;
