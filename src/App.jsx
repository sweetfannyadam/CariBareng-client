import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/Header/Header.jsx';
import Auth from './pages/Auth.jsx';
import Browse from './pages/Browse.jsx';
import Layout from './layout.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout withHeader={true}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/auth"
          element={
            <Layout>
              <Auth />
            </Layout>
          }
        />
        <Route
          path="/browse"
          element={
            <Layout withHeader={true} withSidebar={true}>
              <Browse />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout withHeader={true} withSidebar={true}>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
