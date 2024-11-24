import React, { useState } from 'react';
import Header from './components/Header/Header';
import { AppSidebar } from './components/Sidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { useAuth } from './context/AuthContext';

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
      {children}
    </div>
  );
};

export default Layout;
