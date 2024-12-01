import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const isLoggedIn = isAuthenticated;
  const location = useLocation();
  const pathname = location.pathname;

  console.log('This is user: ', user);
  console.log('This is isLoggedIn: ', isLoggedIn);
  console.log('This is isAuthenticated: ', isAuthenticated);

  return (
    <header className="px-10 py-5 border-b bg-primary">
      <nav className="flex justify-between items-center text-base md:text-xl font-bold">
        <NavLinks />
        {/* {isLoggedIn ? <UserMenu onLogout={handleLogout} /> : <AuthButtons />} */}

        {pathname !== '/' && isLoggedIn
          ? (console.log('pathname:', pathname),
            console.log('isLoggedIn:', isLoggedIn),
            (<UserMenu />))
          : (console.log('pathname:', pathname),
            console.log('isLoggedIn:', isLoggedIn),
            (<AuthButtons />))}
      </nav>
    </header>
  );
};

export default Header;
