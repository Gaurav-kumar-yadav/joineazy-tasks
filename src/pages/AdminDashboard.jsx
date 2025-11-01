
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import ProgressBar from '../components/ProgressBar';
import { assignments as allAssignments, users as allUsers, submissions as allSubmissions } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [adminAssignments, setAdminAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) {
      setLoading(false);
      return;
    }

    const assignmentsWithDetails = allAssignments.map(assignment => {
      const studentData = allUsers.filter(user => user.role === 'student').map(student => {
        const studentSubmission = allSubmissions.find(
          sub => sub.assignmentId === assignment.id && sub.studentId === student.id
        );
        return {
          id: student.id,
          name: student.name,
          submitted: studentSubmission ? studentSubmission.status === 'submitted' : false,
          submissionDate: studentSubmission?.submittedAt || null,
        };
      });

      const totalStudents = studentData.length;
      const submittedStudents = studentData.filter(s => s.submitted).length;
      const progress = totalStudents > 0 ? (submittedStudents / totalStudents) * 100 : 0;

      return {
        ...assignment,
        students: studentData,
        progress: progress,
      };
    });
    setAdminAssignments(assignmentsWithDetails);
    setLoading(false);
  }, [user, isAdmin]);

  if (loading) return <DashboardLayout><p className="p-8 text-center">Loading dashboard data...</p></DashboardLayout>;
  
  if (!user || !isAdmin) {
    return <DashboardLayout><p className="p-8 text-center text-red-500 font-semibold">Access Denied: You must be an administrator to view this page.</p></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assignment Overview</h2>

        {adminAssignments.length === 0 ? (
          <p className="text-gray-600">No assignments created yet. Go to 'Create Assignment' in the sidebar to add one.</p>
        ) : (
          <div className="space-y-8">
            {adminAssignments.map(assignment => (
              <div key={assignment.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                <p className="text-gray-600 text-sm mb-4">Due: {new Date(assignment.dueDate).toLocaleString([], {
                    year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', hour12: true
                  })}</p>
                
                {assignment.driveLink && (
                  <a
                    href={assignment.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm block mb-4"
                  >
                    View Assignment Details (Drive Link)
                  </a>
                )}

               
                <div className="mb-6 space-y-2"> 
                  <p className="text-sm font-medium text-gray-700">
                    Overall Submission Progress: <span className="font-semibold">{assignment.progress.toFixed(0)}%</span>
                  </p>
                  <ProgressBar progress={assignment.progress} /> 
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{assignment.students.filter(s => s.submitted).length}</span> of <span className="font-medium">{assignment.students.length}</span> students submitted
                  </p>
                </div>

                <h4 className="text-lg font-medium text-gray-700 mt-6 mb-3">Student Submissions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignment.students.map(student => (
                    <div key={student.id} className="p-3 bg-gray-50 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                      <span className="font-medium text-gray-800 flex-shrink-0">{student.name}</span> 
                      {student.submitted ? (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 sm:mt-0 sm:ml-2"> 
                          <span className="text-green-600 font-semibold flex items-center">
                            <svg className="w-4 h-4 mr-1 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            Submitted
                          </span>
                          {student.submissionDate && (
                            <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                              ({new Date(student.submissionDate).toLocaleString([], {
                                year: 'numeric', month: 'short', day: 'numeric',
                                hour: '2-digit', minute: '2-digit', hour12: true
                              })})
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-red-500 font-medium flex items-center mt-1 sm:mt-0 sm:ml-2">
                          <svg className="w-4 h-4 mr-1 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                          Not Submitted
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;