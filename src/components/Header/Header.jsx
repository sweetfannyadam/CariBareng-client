import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import AuthButtons from './AuthButtons';
import UserMenu from './UserMenu';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  console.log(pathname);
  return (
    <header className="px-10 py-5 border-b bg-sky-500">
      <nav className="flex justify-between items-center text-base md:text-xl font-bold">
        <NavLinks />
        {pathname != '/' && isLoggedIn ? (
          <UserMenu onLogout={handleLogout} />
        ) : (
          <AuthButtons />
        )}
      </nav>
    </header>
  );
};

export default Header;
