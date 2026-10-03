// Minimal Express API for the Student Service Portal.
// Start it with: npm run api
const crypto = require('crypto');
const cors = require('cors');
const express = require('express');
const { users } = require('./data');

const app = express();
const PORT = 3000;

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

// '0.0.0.0' lets an Android emulator or phone on the same Wi-Fi reach this server.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});
