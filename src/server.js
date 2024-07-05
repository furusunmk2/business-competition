// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [
  { username: 'user', password: 'password' } // テスト用のユーザー
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', req.body); // ログを追加
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log('Login successful');
    res.status(200).json({ message: 'Login successful' });
  } else {
    console.log('Invalid username or password');
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log('Received register request:', req.body); // ログを追加
  if (!username || !password) {
    console.log('Username or password missing');
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const userExists = users.some(u => u.username === username);
  if (userExists) {
    console.log('User already exists');
    return res.status(400).json({ message: 'User already exists' });
  } else {
    users.push({ username, password });
    console.log('User registered successfully:', { username, password });
    res.status(200).json({ message: 'Registration successful' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
