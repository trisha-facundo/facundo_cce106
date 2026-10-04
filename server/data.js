// In-memory demo data. Nothing is saved to a database.
// The password lives only on the server; the app never stores it.
const users = [
  {
    id: 1,
    name: 'Demo Student',
    email: 'student@example.com',
    password: 'password123',
    role: 'Student',
  },
];

// Demo student records. The app gets these only through GET /students.
const students = [
  { id: 1, name: 'Maria Santos', email: 'maria.santos@example.com', course: 'BS Computer Engineering' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan.delacruz@example.com', course: 'BS Information Technology' },
  { id: 3, name: 'Angela Reyes', email: 'angela.reyes@example.com', course: 'BS Computer Science' },
  { id: 4, name: 'Mark Villanueva', email: 'mark.villanueva@example.com', course: 'BS Electronics Engineering' },
  { id: 5, name: 'Camille Garcia', email: 'camille.garcia@example.com', course: 'BS Information Systems' },
  { id: 6, name: 'Paolo Mendoza', email: 'paolo.mendoza@example.com', course: 'BS Computer Engineering' },
  { id: 7, name: 'Isabel Ramos', email: 'isabel.ramos@example.com', course: 'BS Information Technology' },
  { id: 8, name: 'Gabriel Torres', email: 'gabriel.torres@example.com', course: 'BS Computer Science' },
];

module.exports = { users, students };
