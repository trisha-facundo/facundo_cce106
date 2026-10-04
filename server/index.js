// Minimal Express API for the Student Service Portal.
// Start it with: npm run api
const crypto = require('crypto');
const cors = require('cors');
const express = require('express');
const { users, students } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Generated tokens are kept in memory: token -> user.
// Later endpoints will look tokens up here to find who is calling.
const sessions = new Map();

// POST /login  { email, password }  ->  { token, user }
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  // Never send the password back to the app.
  const user = { id: found.id, name: found.name, email: found.email };
  const token = crypto.randomUUID();
  sessions.set(token, user);

  res.status(200).json({ token, user });
});

// Middleware for protected routes.
// Expects the header  Authorization: Bearer <token>  and checks the token we issued at login.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  const user = sessions.get(token);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized. Please sign in again.' });
  }

  req.user = user;
  next();
}

// GET /students  ->  [ { id, name, email, course }, ... ]   (protected)
app.get('/students', requireAuth, (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id  ->  one student, or 404 if the id does not exist   (protected)
app.get('/students/:id', requireAuth, (req, res) => {
  const student = students.find((s) => String(s.id) === req.params.id);

  if (!student) {
    return res.status(404).json({ message: 'Student not found.' });
  }

  res.status(200).json(student);
});

// GET /profile  ->  the profile of whoever owns the token   (protected)
app.get('/profile', requireAuth, (req, res) => {
  const found = users.find((u) => u.id === req.user.id);

  // Never send the password back to the app.
  res.status(200).json({ id: found.id, name: found.name, email: found.email, role: found.role });
});

// '0.0.0.0' lets an Android emulator or phone on the same Wi-Fi reach this server.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});
