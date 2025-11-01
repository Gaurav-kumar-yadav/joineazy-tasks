

const generateId = () => Math.random().toString(36).substr(2, 9);

export const users = [
  // --- Existing Users ---
  { id: 'student1', username: 'student_alpha', password: 'password', role: 'student', name: 'Alice Smith' },
  { id: 'student2', username: 'student_beta', password: 'password', role: 'student', name: 'Bob Johnson' },
  { id: 'admin1', username: 'prof_carol', password: 'password', role: 'admin', name: 'Prof. Carol White' },

  // --- Added Students ---
  { id: 'student3', username: 'student_charlie', password: 'password', role: 'student', name: 'Charlie Brown' },
  { id: 'student4', username: 'student_delta', password: 'password', role: 'student', name: 'Diana Prince' },
  { id: 'student5', username: 'student_echo', password: 'password', role: 'student', name: 'Ethan Hunt' },
  { id: 'student6', username: 'student_foxtrot', password: 'password', role: 'student', name: 'Fiona Gallagher' },

  // --- Added Admins ---
  { id: 'admin2', username: 'prof_david', password: 'password', role: 'admin', name: 'Prof. David Lee' },
  { id: 'admin3', username: 'prof_eva', password: 'password', role: 'admin', name: 'Prof. Eva Green' },
];


export const assignments = [
  {
    id: 'assign1',
    title: 'React Component Design',
    description: 'Design and implement a reusable Button component.',
    dueDate: '2023-11-15T23:59:00Z',
    driveLink: 'https://drive.google.com/link/to/design_guide',
    createdBy: 'admin1',
  },
  {
    id: 'assign2',
    title: 'Tailwind CSS Layout',
    description: 'Build a responsive 3-column layout using Tailwind CSS.',
    dueDate: '2023-11-20T23:59:00Z',
    driveLink: 'https://drive.google.com/link/to/layout_spec',
    createdBy: 'admin1',
  },
  {
    id: 'assign3',
    title: 'State Management with Hooks',
    description: 'Refactor a simple counter app to use useState and useEffect.',
    dueDate: '2023-11-25T23:59:00Z',
    driveLink: 'https://drive.google.com/link/to/state_challenge',
    createdBy: 'admin1',
  },
];

export let submissions = [
  {
    id: generateId(),
    assignmentId: 'assign1',
    studentId: 'student1',
    submittedAt: '2023-11-14T10:00:00Z',
    status: 'submitted', // 'submitted' | 'not_submitted'
  },
  {
    id: generateId(),
    assignmentId: 'assign2',
    studentId: 'student1',
    submittedAt: null,
    status: 'not_submitted',
  },
  {
    id: generateId(),
    assignmentId: 'assign1',
    studentId: 'student2',
    submittedAt: null,
    status: 'not_submitted',
  },
  {
    id: generateId(),
    assignmentId: 'assign3',
    studentId: 'student2',
    submittedAt: '2023-11-23T15:30:00Z',
    status: 'submitted',
  },
];

// Function to simulate a submission
export const submitAssignment = (assignmentId, studentId) => {
  const existingSubmissionIndex = submissions.findIndex(
    (sub) => sub.assignmentId === assignmentId && sub.studentId === studentId
  );

  if (existingSubmissionIndex !== -1) {
    submissions[existingSubmissionIndex] = {
      ...submissions[existingSubmissionIndex],
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };
  } else {
    submissions.push({
      id: generateId(),
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    });
  }
  console.log(`Submission recorded for assignment ${assignmentId} by student ${studentId}`);
  // In a real app, you'd save this to a backend
  return true;
};

// Function to simulate creating a new assignment
export const createAssignment = (newAssignment) => {
  const assignmentWithId = { ...newAssignment, id: generateId(), createdBy: 'admin1' }; // Assume admin1 for now
  assignments.push(assignmentWithId);
  // Also create initial 'not_submitted' entries for all students
  users.filter(u => u.role === 'student').forEach(student => {
    submissions.push({
      id: generateId(),
      assignmentId: assignmentWithId.id,
      studentId: student.id,
      submittedAt: null,
      status: 'not_submitted',
    });
  });
  console.log('Assignment created:', assignmentWithId);
  return assignmentWithId;
};