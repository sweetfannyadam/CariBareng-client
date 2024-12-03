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
import Edit from './pages/profile/EditProfile.jsx';
import { GuestRoute } from './components/GuestRoute.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DetailMissingItemCard from './pages/DetailMissingItemCard.jsx';

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
            <GuestRoute>
              <Layout>
                <Auth />
              </Layout>
            </GuestRoute>
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
          path="/detail/:id"
          element={
            <Layout withHeader={true}>
              <DetailMissingItemCard />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout withHeader={true}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/post-item"
          element={
            <ProtectedRoute>
              <Layout>
                <AddItemLose />
              </Layout>
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Layout withHeader={true}>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <Edit />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
