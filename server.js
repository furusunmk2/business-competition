// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;

app.use(bodyParser.json());
// CORS設定
app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのオリジンを指定
  credentials: true // クレデンシャル（Cookieなど）を含むリクエストを許可
}));

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
        res.status(401).json({ message: 'Invalid username/email or password' });
      }
    });
  });
});

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

//クイズ関連ーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get('/api/quiz/:id', (req, res) => {
  const quizId = req.params.id;
  const quizQuery = 'SELECT * FROM quizzes WHERE id = ?';
  const choicesQuery = 'SELECT * FROM quiz_choices WHERE quiz_id = ?';

  db.query(quizQuery, [quizId], (err, quizResults) => {
    if (err) throw err;

    db.query(choicesQuery, [quizId], (err, choicesResults) => {
      if (err) throw err;

      res.json({
        quiz: quizResults[0],
        choices: choicesResults
      });
    });
  });
});

app.get('/api/quizzes', (req, res) => {
  const query = 'SELECT id, title FROM quizzes';
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/answer', (req, res) => {
  const { userId, quizId, choiceId, isCorrect } = req.body;

  const findAnswerQuery = 'SELECT * FROM user_answers WHERE user_id = ? AND quiz_id = ?';
  const updateAnswerQuery = 'UPDATE user_answers SET choice_id = ?, answered_at = CURRENT_TIMESTAMP, is_correct = ? WHERE user_id = ? AND quiz_id = ?';
  const insertAnswerQuery = 'INSERT INTO user_answers (user_id, quiz_id, choice_id, is_correct) VALUES (?, ?, ?, ?)';

  db.query(findAnswerQuery, [userId, quizId], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      db.query(updateAnswerQuery, [choiceId, isCorrect, userId, quizId], (err) => {
        if (err) throw err;
        res.status(200).json({ message: 'Answer updated successfully' });
      });
    } else {
      db.query(insertAnswerQuery, [userId, quizId, choiceId, isCorrect], (err) => {
        if (err) throw err;
        res.status(201).json({ message: 'Answer saved successfully' });
      });
    }
  });
});
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
