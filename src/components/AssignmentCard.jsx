// src/components/AssignmentCard.jsx
import React from 'react';
import Button from './Button';
import ProgressBar from './ProgressBar';

const AssignmentCard = ({ assignment, submission, onConfirmSubmission }) => {
  const isSubmitted = submission && submission.status === 'submitted';
  const dueDate = new Date(assignment.dueDate).toLocaleString([], {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  }); // More readable date format

  const handleSubmissionClick = () => {
    // This is the double-verification flow
    if (window.confirm(`Are you sure you want to mark "${assignment.title}" as submitted?`)) {
      if (window.confirm("This is your final confirmation. Have you truly submitted your work externally?")) {
        onConfirmSubmission(assignment.id);
      } else {
        alert("Submission cancelled. Please confirm when ready.");
      }
    } else {
      alert("Submission cancelled.");
    }
  };

  const submissionDate = submission?.submittedAt
    ? new Date(submission.submittedAt).toLocaleString([], {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      })
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full border border-gray-100">
      {/* Top section with assignment details */}
      <div className="space-y-3 flex-grow"> {/* flex-grow ensures it takes available space */}
        <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
        <p className="text-gray-600 text-sm">{assignment.description}</p>
        <p className="text-gray-500 text-xs">Due: <span className="font-medium text-gray-700">{dueDate}</span></p>
        {assignment.driveLink && (
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm block"
          >
            View Assignment Details (Drive Link)
          </a>
        )}
      </div>

      {/* Bottom section with submission status and button */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3"> 
        {isSubmitted ? (
          <>
            <p className="text-sm font-medium text-gray-700">Submission Status: <span className="text-green-600">100%</span></p>
            <ProgressBar progress={100} /> 
            {submissionDate && (
              <p className="text-sm text-gray-600">
                Submitted: <span className="font-medium">{submissionDate}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">Submission Status: <span className="text-red-500">0%</span></p>
            <ProgressBar progress={0} />
            <p className="text-sm text-red-500 font-medium">Not Submitted</p>
            <Button onClick={handleSubmissionClick} className="w-full mt-2" variant="primary">
              Mark as Submitted
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;