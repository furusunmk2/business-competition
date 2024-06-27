// Server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt")
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "disaster_master",
}) ;
db.connect((err)=>{
  if (err) throw err;
  console.log("Connected to database");
});

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
  const { username, password, email, nickname } = req.body;
  const checkUserSql = 'SELECT * FROM users WHERE username = ?';
  
  db.query(checkUserSql, [username], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
          res.status(400).send('Username already exists');
      } else {
          bcrypt.hash(password, 10, (err, hash) => {
              if (err) throw err;
              const insertUserSql = 'INSERT INTO users (username, password, email, nickname) VALUES (?, ?, ?, ?)';
              db.query(insertUserSql, [username, hash, email, nickname], (err, result) => {
                  if (err) throw err;
                  res.send('User registered');
              });
          });
      }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
