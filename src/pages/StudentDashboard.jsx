
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { assignments as allAssignments, submissions as allSubmissions, submitAssignment } from '../data/mockData';
import AssignmentCard from '../components/AssignmentCard';
import DashboardLayout from '../layouts/DashboardLayout';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [studentAssignments, setStudentAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'student') {
      
      const assignmentsWithSubmissionStatus = allAssignments.map(assignment => {
        const studentSubmission = allSubmissions.find(
          sub => sub.assignmentId === assignment.id && sub.studentId === user.id
        );
        return {
          ...assignment,
          submission: studentSubmission || { status: 'not_submitted', submittedAt: null },
        };
      });
      setStudentAssignments(assignmentsWithSubmissionStatus);
      setLoading(false);
    }
  }, [user]);

  const handleConfirmSubmission = (assignmentId) => {
    if (user) {
      const success = submitAssignment(assignmentId, user.id); 
      if (success) {
        
        setStudentAssignments(prevAssignments =>
          prevAssignments.map(assign =>
            assign.id === assignmentId
              ? { ...assign, submission: { status: 'submitted', submittedAt: new Date().toISOString() } }
              : assign
          )
        );
        alert('Assignment successfully marked as submitted!');
      } else {
        alert('Failed to submit assignment.');
      }
    }
  };

  if (loading) return <DashboardLayout><p className="p-8 text-center">Loading assignments...</p></DashboardLayout>;
  if (!user || user.role !== 'student') return <p className="p-8 text-center text-red-500">Access Denied: Please log in as a student.</p>;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.name}!</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Assignments</h2>

        {studentAssignments.length === 0 ? (
          <p className="text-gray-600">No assignments available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                submission={assignment.submission}
                onConfirmSubmission={handleConfirmSubmission}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;