// In-memory demo data. Nothing is saved to a database.
// The password lives only on the server; the app never stores it.
const users = [
  {
    id: 1,
    name: 'Demo Student',
    email: 'student@example.com',
    password: 'password123',
  },
];

module.exports = { users };
