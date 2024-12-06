import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  refreshToken,
  setAccessToken,
  setTokenExpiration,
  getAccessToken,
  decodeToken,
  isTokenValid,
  setRefreshToken,
  clearTokens,
} from '@/utils/authentication';
import { fetchUser } from '@/utils/user';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [isAuthenticated, setAuthenticated] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token && isTokenValid(token)) {
        try {
          const userData = await fetchUser(token);
          setUser(userData);
          setAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user:', error);
          setAuthenticated(false);
          logout();
        }
      } else {
        setAuthenticated(false);
      }

      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  // Authentication
  const login = (newToken, refreshToken) => {
    setToken(newToken);
    setAccessToken(newToken);
    setRefreshToken(refreshToken);
    setAuthenticated(true);

    const decodedToken = decodeToken(newToken);
    setTokenExpiration(decodedToken.exp);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearTokens();
    localStorage.removeItem('access_token_expiration');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
