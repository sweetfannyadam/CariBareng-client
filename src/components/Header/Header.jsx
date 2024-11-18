import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const openHamburger = () => {
    setIsMenuOpen(true);
  };

  const closeHamburger = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-sky-500 text-white py-2 md:py-5 px-5 md:px-20 xl:px-40">
      {/* Header bar */}
      <div className="flex justify-between items-center lg:hidden">
        <img src="caribareng.png" alt="logo cari bareng" className="w-20 shadow-md bg-white p-2 rounded-t-2xl rounded-l-2xl" />
        <button
          id="openHamburger"
          onClick={openHamburger}
          className="text-white"
          aria-label="Open Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-between items-center text-base md:text-xl font-bold">
          <NavLinks />
          {pathname !== "/" && isLoggedIn ? (
            <UserMenu onLogout={handleLogout} />
          ) : (
            <AuthButtons />
          )}
        </nav>

        {/* Sidebar Menu */}
        <div
          id="hamburgerMenu"
          className={`fixed z-50 top-0 lg:hidden left-0 h-full bg-sky-500 text-black shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ width: "250px" }}
        >
          <div className="flex justify-between p-3">
            <img src="caribareng.png" alt="logo cari bareng" className="w-20 shadow-md bg-white p-2 rounded-t-2xl rounded-l-2xl" />
            <button
              id="closeHamburger"
              onClick={closeHamburger}
              className="text-white p-3"
              aria-label="Close Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-5 flex flex-col justify-between h-[90%]">
            {/* Include NavLinks and Conditional Buttons */}
            <NavLinks />
            {pathname !== "/" && isLoggedIn ? (
              <UserMenu onLogout={handleLogout} />
            ) : (
              <AuthButtons />
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
