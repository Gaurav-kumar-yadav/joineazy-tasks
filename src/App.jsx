
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; 
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard'; 
import CreateAssignmentPage from './pages/CreateAssignmentPage'; 


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isAdmin, isStudent } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = isAdmin ? 'admin' : (isStudent ? 'student' : null);

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <div className="text-center p-8 text-red-500">Access Denied: You do not have permission to view this page.</div>;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider> 
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-assignment"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateAssignmentPage />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<div className="text-center p-8">404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;