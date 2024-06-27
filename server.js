// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "disaster_master",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// ログインエンドポイント
app.post('/login', (req, res) => {
  const { loginInput, password } = req.body;
  console.log('Login attempt:', req.body); // ログを追加

  const sql = 'SELECT * FROM users WHERE username = ? OR email = ?';
  db.query(sql, [loginInput, loginInput], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      console.log('Invalid username/email or password: no user found');
      return res.status(401).json({ message: 'Invalid username/email or password' });
    }

    const user = result[0];
    console.log('User found:', user); // 取得したユーザー情報をログに表示

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (isMatch) {
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log('Invalid username/email or password: password mismatch');
        res.status(410).json({ message: 'Invalid username/email or password' });
      }
    });
  });
});

// 登録エンドポイント
app.post('/register', (req, res) => {
  const { username, password, email, nickname } = req.body;
  const checkUserSql = 'SELECT * FROM users WHERE username = ?';

  db.query(checkUserSql, [username], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Bcrypt error:', err);
          return res.status(500).json({ message: 'Server error' });
        }

        const insertUserSql = 'INSERT INTO users (username, password, email, nickname) VALUES (?, ?, ?, ?)';
        db.query(insertUserSql, [username, hash, email, nickname], (err, result) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
          }

          res.status(200).json({ message: 'User registered' });
        });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
