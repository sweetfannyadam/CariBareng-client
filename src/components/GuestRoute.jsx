import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const GuestRoute = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/dashboard'); // Redirect logged-in users to the dashboard
    }
  }, [token, navigate]);

  if (token) return null; // Prevent rendering for logged-in users

  return children;
};
