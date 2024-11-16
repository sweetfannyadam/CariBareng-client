import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Browse from './pages/Browse.jsx';
import Layout from './layout.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AboutUs from './pages/aboute-us/AboutUs.jsx';
import Contact from './pages/contact/Contact.jsx';
import AddItemLose from './pages/addItemLose.jsx';

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
        <Route
          path="/dashboard/post-item"
          element={
            <Layout>
              <AddItemLose />
            </Layout>
          }
        />
        <Route
          path="/about-us"
          element={
            <Layout withHeader={true} withSidebar={true}>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout withHeader={true} withSidebar={true}>
              <Contact />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
