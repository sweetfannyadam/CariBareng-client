import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  refreshToken,
  setAccessToken,
  setTokenExpiration,
  getAccessToken,
  decodeToken,
} from '@/utils/authUtils';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = getAccessToken();

      if (token) {
        const decodedToken = decodeToken(token);
        const expirationTime = localStorage.getItem('access_token_expiration');
        const currentTime = Date.now();

        if (currentTime > expirationTime) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              setAccessToken(newToken);
              setTokenExpiration(decodedToken.exp);
              setToken(newToken);
            } else {
              logout();
              setToken(null);
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            setToken(null);
          }
        } else {
          setToken(token);
        }
      }

      setIsLoading(false);
    };

    checkTokenExpiry();
  }, [token]);

  const login = (userData, newToken) => {
    setToken(newToken);
    setUser(userData);
    setAccessToken(newToken);
    const decodedToken = decodeToken(newToken);
    setTokenExpiration(decodedToken.exp);
  };

  const fetchUser = async (token) => {
    try {
      const response = await axiosInstance.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expiration');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
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
