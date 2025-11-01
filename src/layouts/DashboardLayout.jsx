
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button'; 

const DashboardLayout = ({ children }) => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    
    return <div className="text-center p-8">Please log in to view the dashboard. <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link></div>;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      
      <aside className="w-full lg:w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-8">Joineazy</div>
          <nav className="space-y-2">
            {isStudent && (
              <Link to="/student" className="block p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">
                My Assignments
              </Link>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" className="block p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">
                  Manage Assignments
                </Link>
                <Link to="/admin/create-assignment" className="block p-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium">
                  Create Assignment
                </Link>
              </>
            )}
            
          </nav>
        </div>
        <div className="mt-8">
          <div className="text-sm text-gray-500 mb-2">Logged in as: <span className="font-semibold text-gray-700">{user.name} ({user.role})</span></div>
          <Button onClick={handleLogout} variant="secondary" className="w-full">
            Logout
          </Button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;