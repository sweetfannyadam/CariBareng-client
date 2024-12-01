import React from 'react';
import { Link } from 'react-router-dom';


const NavLinks = () => (
  <>
    <img src="caribareng.png" alt="logo cari bareng" className="hidden lg:block w-20 mr-10 shadow-md bg-white p-2 rounded-t-2xl rounded-l-2xl" />
    <ul className="flex-col flex-grow lg:flex-row gap-y-3 gap-x-10 flex justify-start">
      <li>
        <Link
          to="/"
          className="group flex items-center text-popover transition-colors duration-300 ease-in-out hover:text-popover-foreground"
        >
          <span className="relative">
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-popover-foreground transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/about-us"
          className="group flex items-center text-popover transition-colors duration-300 ease-in-out hover:text-popover-foreground"
        >
          <span className="relative">
            About Us
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-popover-foreground transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="group flex items-center text-popover transition-colors duration-300 ease-in-out hover:text-popover-foreground"
        >
          <span className="relative">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-popover-foreground transform origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </span>
        </Link>
      </li>
    </ul>
  </>
);

export default NavLinks;
