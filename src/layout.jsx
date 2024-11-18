import React from 'react';
import Header from './components/Header/Header';

const layout = ({
  children,
  withHeader = false,
  withSidebar = false,
  isLoggedIn = false,
}) => {
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
