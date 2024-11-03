import React, { useState } from 'react';
import Header from './components/Header/Header';
import { AppSidebar } from './components/Sidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';

const layout = ({ children, withHeader = false, withSidebar = false }) => {
  if (withSidebar) {
    return (
      <div>
        {withSidebar && (
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full">
              {withHeader && <Header />}
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
      {withHeader && <Header />}
      {children}
    </div>
  );
};

export default layout;
