import React, { useState } from 'react';
import Header from './components/Header/Header';
import { useAuth } from './context/AuthContext';

const Layout = ({ children, withHeader = false, withSidebar = false }) => {
  const { user } = useAuth();
  const isLoggedIn = user != null;

const Layout = ({ children, withHeader = false, withSidebar = false }) => {
  const { user } = useAuth();
  const isLoggedIn = user != null;

  if (withSidebar) {
    return (
      <div>
        {withSidebar && (
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full">
              {withHeader && <Header isLoggedIn={isLoggedIn} />}
              {withHeader && <Header isLoggedIn={isLoggedIn} />}
              {children}
              <SidebarTrigger />
            </main>
          </SidebarProvider>
        )}
      </div>
    );
  }
  return (
    <div>
      {withHeader && <Header isLoggedIn={isLoggedIn} />}
      {withHeader && <Header isLoggedIn={isLoggedIn} />}
      {children}
    </div>
  );
};

export default Layout;
export default Layout;
