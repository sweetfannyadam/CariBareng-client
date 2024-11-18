import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout.jsx';

// pages
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Browse from './pages/Browse.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import AboutUs from './pages/aboute-us/AboutUs.jsx';
import Contact from './pages/contact/Contact.jsx';
import AddItemLose from './pages/addItemLose.jsx';
import Profile from './pages/profile/Profile.jsx';
import Edit from './pages/profile/edit.jsx';

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
            <Layout withHeader={true}>
              <Browse />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout withHeader={true}>
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
            <Layout withHeader={true}>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout withHeader={true}>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout withHeader={true}>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <Layout>
              <Edit />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
