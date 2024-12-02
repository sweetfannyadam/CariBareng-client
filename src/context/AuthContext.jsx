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

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  // Authentication
  const login = (newToken, refreshToken) => {
    setToken(newToken);
    setAccessToken(newToken);
    setRefreshToken(refreshToken);

    const decodedToken = decodeToken(newToken);
    setTokenExpiration(decodedToken.exp);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearTokens();
    localStorage.removeItem('access_token_expiration');
  };

  // User Data
  const loadUser = async (token) => {
    const userData = await fetchUser(token);
    console.log('Auth loadUser:', userData);
    if (userData) {
      setUser(userData);
    }
  };

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = getAccessToken();

      if (token) {
        const tokenValidation = isTokenValid(token);
        if (tokenValidation) {
          await loadUser(token);
          return;
        }
      } else {
        setUser(null);
      }

      console.log('isAuthenticated in AuthContext:', isAuthenticated);

      setIsLoading(false);
    };

    checkTokenExpiry();
  }, [token]);

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
