import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const { login, isAuthenticated, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else if (isStudent) {
        navigate('/student', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, isStudent, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedRole = role.trim().toLowerCase();

    console.log('🚀 Logging in as:', trimmedUsername, trimmedPassword, trimmedRole);

    const success = login(trimmedUsername, trimmedPassword, trimmedRole);

    if (!success) {
      setError(`Invalid credentials for ${trimmedRole} role.`);
    }
  };

  // Redirecting placeholder
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            
            <div>
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full mt-2 px-3 py-2 border border-gray-300 rounded-b-md bg-white text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

         
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </Button>
          </div>

          
          <div className="text-xs text-gray-500 text-center mt-3">
            <p>🧑‍🎓 Students → student_alpha / password</p>
            <p>👨‍🏫 Admins → prof_carol / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
