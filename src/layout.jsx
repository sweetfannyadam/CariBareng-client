import React from 'react';
import Header from './components/Header/Header';

const layout = ({ children, withHeader = false}) => {
  
  return (
    <div>
      {withHeader && <Header />}
      {children}
    </div>
  );
};

export default layout;
