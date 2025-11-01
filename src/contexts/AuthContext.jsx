
import React, { createContext, useState, useEffect, useContext } from 'react';
import { users } from '../data/mockData'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    // Simulate checking localStorage for a logged-in user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    // Trim whitespace from username and password inputs
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Find user with EXACT match for both username and password
    const foundUser = users.find(
      u => u.username === trimmedUsername && u.password === trimmedPassword
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true; // Login successful
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!user;
  const isAdmin = user && user.role === 'admin';
  const isStudent = user && user.role === 'student';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, isStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);