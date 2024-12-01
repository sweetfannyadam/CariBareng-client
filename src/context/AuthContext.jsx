import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  refreshToken,
  setAccessToken,
  setTokenExpiration,
  getAccessToken,
  decodeToken,
  isTokenValid,
} from '@/utils/authentication';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;

  useEffect(() => {
    const checkTokenExpiry = async () => {
      const token = getAccessToken();

      if (token) {
        const decodedToken = decodeToken(token);
        // const expirationTime = localStorage.getItem('access_token_expiration');
        // const currentTime = Date.now();

        setToken(token);
        console.log('This is decodeToken.exp: ', decodedToken.exp);
        // setTokenExpiration(decodedToken.exp);
        await fetchUser(token);

        // if (currentTime > expirationTime) {
        //   try {
        //     const newToken = await refreshToken();
        //     if (newToken) {
        //       setAccessToken(newToken);
        //       setTokenExpiration(decodedToken.exp);
        //       setToken(newToken);

        //       localStorage.setItem('access_token_expiration', isTokenValid);
        //     } else {
        //       logout();
        //       setToken(null);
        //     }
        //   } catch (error) {
        //     console.error('Error refreshing token:', error);
        //     logout();
        //     setToken(null);
        //   }
        // } else {
        //   setUser(null);
        // }
      } else {
        setUser(null);
      }

      console.log('User in AuthContext:', user);
      console.log('Token in AuthContext:', token);
      console.log('isAuthenticated in AuthContext:', isAuthenticated);

      setIsLoading(false);
    };

    checkTokenExpiry();
  }, [token]);

  const fetchUser = async (token) => {
    try {
      const response = await axiosInstance.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error(
        'Error fetching user:',
        error.response?.data || error.message
      );
    }
  };

  const login = (newToken, refreshToken) => {
    setToken(newToken);
    setAccessToken(newToken);

    const decodedToken = decodeToken(newToken);

    setTokenExpiration(decodedToken.exp);
    console.log('This is decodeToken.exp: ', decodedToken.exp);
    console.log('This is decodeToken.user: ', decodedToken.user);

    console.log('User after login:', userData);
    console.log('Token after login:', newToken);

    localStorage.setItem('accessToken', newToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('access_token_expiration');

    const remaining_token = localStorage.getItem('accessToken');
    console.log(remaining_token);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoading, isAuthenticated }}
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
