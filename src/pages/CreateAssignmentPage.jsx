
import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import Button from '../components/Button';
import { createAssignment } from '../data/mockData'; 
import { useNavigate } from 'react-router-dom'; 

const CreateAssignmentPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (!title || !description || !dueDate) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const newAssignment = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString(), // Ensure ISO format for consistency
      driveLink: driveLink || null, // Optional
    };

    const created = createAssignment(newAssignment); // Call your mock data function
    if (created) {
      setMessage('Assignment created successfully!');
      setTitle('');
      setDescription('');
      setDueDate('');
      setDriveLink('');
      // Optionally redirect to admin dashboard after successful creation
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } else {
      setMessage('Failed to create assignment.');
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Assignment</h1>

        {message && (
          <div className={`p-3 mb-4 rounded-md text-center ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Assignment Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="datetime-local" // Use datetime-local for date and time input
              id="dueDate"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700">
              Google Drive Link (Optional)
            </label>
            <input
              type="url"
              id="driveLink"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="e.g., https://drive.google.com/link/to/document"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            Create Assignment
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateAssignmentPage;