import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = isAuthenticated;
  const location = useLocation();
  const pathname = location.pathname;

  const [menuWidth, setMenuWidth] = useState('0');

  const openHamburger = () => setMenuWidth('250px');
  const closeHamburger = () => setMenuWidth('0');

  return (
      <header className="border mb-20">
        <div className='fixed md:block bg-primary w-full px-5 md:px-10 py-5 z-50'>
          <div className='flex justify-between'>
            <img src="../caribareng.png" alt="logo cari bareng" className="md:hidden w-20 mr-10 shadow-md bg-white p-2 rounded-t-2xl rounded-l-2xl" />
            <button 
              id="openHamburger" 
              aria-label="Open menu" 
              onClick={openHamburger}
              className="text-2xl font-bold text-primary-foreground md:hidden"
            >
              &#9776;
            </button>
          </div>

          {/* Menu Hamburger */}
          <div 
          className='bg-primary shadow-xl'
            id="hamburgerMenu"
            style={{
              width: menuWidth,
              height: '100%',
              position: 'fixed',
              top: 0,
              left: 0,
              overflowX: 'hidden',
              transition: '0.3s',
              zIndex: 999,
            }}
          >
            <button 
              id="closeHamburger" 
              onClick={closeHamburger}
              className="text-2xl text-primary-foreground absolute top-4 right-7"
            >
              &times;
            </button>
            <div className="text-white pt-10 p-5 flex flex-col h-full justify-between">
              <NavLinks />
              {isLoggedIn ? <UserMenu /> : <AuthButtons />}
            </div>
          </div>

          {/* Navigation bar untuk layar besar */}
          <nav className="hidden md:flex justify-between items-center text-base md:text-xl font-bold">
            <NavLinks />
            {pathname !== '/' && isLoggedIn ? <UserMenu /> : <AuthButtons />}
          </nav>

        </div>
        {/* Tombol untuk membuka menu */}
      </header>
  );
};

export default Header;
