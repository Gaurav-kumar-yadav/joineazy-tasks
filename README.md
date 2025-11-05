Joineazy Assignment & Review Dashboard

Role: Frontend Intern
Stack: React.js, HTML, CSS, Tailwind CSS

Project Overview:
This project is a responsive dashboard for managing student assignments, designed with role-based views.

Students: Can view assignments, confirm submissions via double verification, and track their progress.
Admins (Professors): Can create and manage assignments, view submission statuses of students, and attach Google Drive links. The UI is fully responsive and includes progress indicators for assignment completion.

Features:

Student Features:

View only their own assignments

Double-verification submission flow: “Yes, I have submitted” → final confirmation

Assignment completion progress bars

Admin Features:

Create and manage assignments

Track submission status for each student (submitted / not submitted)

Attach Google Drive links to assignments

  Project Structure:
                            
                            Joineazy-Tasks/
                            ├── public/                  # Static files (images, icons, index.html)
                            ├── src/
                            │   ├── components/          # Reusable components (Button, AssignmentCard, ProgressBar)
                            │   ├── contexts/            # Auth context for user role management
                            │   ├── data/                # Mock JSON data for assignments, users, and submissions
                            │   ├── layout/              # Layout components (Header, Sidebar, Footer, DashboardLayout)
                            │   ├── pages/               # Top-level pages (StudentDashboard, AdminDashboard, Login)
                            │   ├── App.jsx              # Main app component
                            │   └── index.jsx            # Entry point
                            ├── package.json
                            ├── tailwind.config.js
                            └── README.md


Key Components:

AuthContext.jsx → Manages authentication and role-based access

AssignmentCard.jsx → Displays assignment info and submission buttons

ProgressBar.jsx → Shows assignment completion visually

Button.jsx → Reusable button component with variants

DashboardLayout.jsx → Wraps pages with header/sidebar/footer for consistent layout

Mock Data / State Management:

Uses JSON arrays for users, assignments, and submissions

Submissions handled via submitAssignment() function

New assignments created via createAssignment() function

React hooks (useState, useEffect) manage UI state

Optional Context API used for global user role management

How to Run Locally:

Clone the repository:

cd joineazy-tasks

git clone https://github.com/Gaurav-kumar-yadav/Joineazy-Tasks

Video Link: https://www.loom.com/share/d943bb1eec40486c938d7bbc47b2267e


Install dependencies:

npm install


Start the development server:

npm start



