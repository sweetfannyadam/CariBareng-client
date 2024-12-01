import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUser } from '@/utils/user';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated && token) {
        setIsLoading(true);
        try {
          const data = await fetchUser(token);
          const userData = data.data;
          setUser(userData);
          console.log('userData:', userData);
          return userData;
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadUser();
  }, [isAuthenticated, token]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
