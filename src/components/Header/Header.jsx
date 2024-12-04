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

  return (
    <header className="px-10 py-5 border-b bg-primary">
      <nav className="flex justify-between items-center text-base md:text-xl font-bold">
        <NavLinks />
        {/* {isLoggedIn ? <UserMenu onLogout={handleLogout} /> : <AuthButtons />} */}
        {pathname !== '/' && isLoggedIn ? <UserMenu /> : <AuthButtons />}
      </nav>
    </header>
  );
};

export default Header;
