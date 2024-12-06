import React from 'react';
import Header from './components/Header/Header.jsx';
import { useAuth } from './context/AuthContext';

const Layout = ({ children, withHeader = false }) => {
  const { isAuthenticated } = useAuth;
  const isLoggedIn = isAuthenticated;

  return (
    <div>
      <main className="min-h-screen w-full bg-background">
        {withHeader && <Header isLoggedIn={isLoggedIn} />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
