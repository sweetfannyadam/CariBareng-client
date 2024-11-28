import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !token) {
      navigate('/auth');
    }
  }, [token, loading, navigate]);

  if (loading || !token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
