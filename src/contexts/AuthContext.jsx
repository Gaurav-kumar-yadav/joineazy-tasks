import React, { createContext, useState, useEffect, useContext } from 'react';
import { users } from '../data/mockData'; // 

console.log("mock data user:",users);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const login = (username, password, role) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    console.log('🟢 Attempting login with:', trimmedUsername, trimmedPassword, role);
    console.log('🟢 Users available:', users);

   
    const foundUser = users.find(
      (u) =>
        u.username === trimmedUsername &&
        u.password === trimmedPassword &&
        u.role === role
    );

    if (foundUser) {
      console.log('✅ Login success:', foundUser);
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }

    console.log('❌ Login failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
