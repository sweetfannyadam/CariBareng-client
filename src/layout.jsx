import React from 'react';
import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';

const Layout = ({ children, withHeader = false }) => {
  const { user } = useAuth();
  const isLoggedIn = user != null;

  return (
    <div>
      <main className="min-h-screen w-full">
        {withHeader && <Header isLoggedIn={isLoggedIn} />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
