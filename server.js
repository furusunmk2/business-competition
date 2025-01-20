// Server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();
const session = require('express-session');
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

// セッションの設定
app.use(session({
  secret: 'your_secret_key', // セッションの暗号化キー
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPSを使っていない場合はfalseに設定
}));


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
      return res.status(401).json({ message: '不正なログイン情報です。' });
    }

    const user = result[0];
    console.log('User found:', user); // 取得したユーザー情報をログに表示

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Bcrypt error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (isMatch) {
        req.session.user = { id: user.id, username: user.username };
        console.log('Login successful');
        console.log(user.id,user.username)
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

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
});


// 認証ミドルウェア
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
}

app.get('/check-session', isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.session.user });
});

// Fetch user info based on session user ID
app.get('/api/user-info/:id', isAuthenticated, (req, res) => {
  const userId = req.params.id;
  db.query('SELECT nickname, email FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching user data');
    }
    res.json(results[0]);
  });
});

app.post('/api/change-nickname', isAuthenticated, (req, res) => {
  const { nickname } = req.body;
  const userId = req.session.user.id;

  if (!nickname) {
    return res.status(400).send('Nickname is required');
  }

  db.query('UPDATE users SET nickname = ? WHERE id = ?', [nickname, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating nickname');
    }
    res.send('Nickname updated successfully');
  });
});

app.post('/api/change-email', isAuthenticated, (req, res) => {
  const { email } = req.body;
  const userId = req.session.user.id;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  db.query('UPDATE users SET email = ? WHERE id = ?', [email, userId], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating email');
    }
    res.send('Email updated successfully');
  });
});

app.post('/api/change-password', isAuthenticated, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.session.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).send('パスワードを入力してください。');
  }

  // 現在のパスワードを取得
  db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).send('Error fetching user data');
    }

    const storedPassword = results[0].password;

    // 現在のパスワードが正しいか確認
    if (!bcrypt.compareSync(currentPassword, storedPassword)) {
      return res.status(401).send('現在のパスワードが間違っています。');
    }

    // 新しいパスワードをハッシュ化
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // パスワードを更新
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId], (err, result) => {
      if (err) {
        return res.status(500).send('Error updating password');
      }
      res.send('Password updated successfully');
    });
  });
});

app.post('/api/delete-account', isAuthenticated, (req, res) => {
  const { currentPassword } = req.body;
  const userId = req.session.user.id;

  if (!currentPassword) {
    return res.status(400).send('パスワードを入力してください。');
  }

  // 現在のパスワードを取得
  db.query('SELECT password FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).send('Error fetching user data');
    }

    const storedPassword = results[0].password;

    // 現在のパスワードが正しいか確認
    if (!bcrypt.compareSync(currentPassword, storedPassword)) {
      return res.status(401).send('正しいパスワードを入力してください。');
    }

    // アカウントを削除
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        return res.status(500).send('Error deleting account');
      }
      // セッションを削除
      req.session.destroy(() => {
        res.send('Account deleted successfully');
      });
    });
  });
});

//学習ページ関連ーーーーーーーーーーーーーーーーーーーーーーーーーーーー
app.get('/api/learning-materials', (req, res) => {
  const sql = 'SELECT id, title, content FROM learning_materials ORDER BY id ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching learning materials:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.post('/api/mark-learned', isAuthenticated, (req, res) => {
  const userId = req.session.user.id;  // Get user ID from session
  const { materialId } = req.body;  // Get material ID from request body

  if (!materialId) {
    return res.status(400).json({ message: 'Material ID is required' });
  }

  // Check if a record already exists for the user and material
  const checkSql = 'SELECT * FROM user_material_views WHERE user_id = ? AND material_id = ?';
  
  db.query(checkSql, [userId, materialId], (err, results) => {
    if (err) {
      console.error('Error checking user_material_views:', err);
      return res.status(500).json({ message: 'Failed to check record' });
    }

    if (results.length > 0) {
      // If record exists, update the learned_at field
      const updateSql = 'UPDATE user_material_views SET learned_at = NOW() WHERE user_id = ? AND material_id = ?';
      db.query(updateSql, [userId, materialId], (err, result) => {
        if (err) {
          console.error('Error updating user_material_views:', err);
          return res.status(500).json({ message: 'Failed to update record' });
        }
        return res.status(200).json({ message: 'Material marked as learned (updated)' });
      });
    } else {
      // If no record exists, insert a new one
      const insertSql = 'INSERT INTO user_material_views (user_id, material_id, learned_at) VALUES (?, ?, NOW())';
      db.query(insertSql, [userId, materialId], (err, result) => {
        if (err) {
          console.error('Error inserting into user_material_views:', err);
          return res.status(500).json({ message: 'Failed to insert record' });
        }
        return res.status(200).json({ message: 'Material marked as learned (new)' });
      });
    }
  });
});

// Route to get total number of learning materials
app.get('/api/total-materials', (req, res) => {
  const sql = 'SELECT COUNT(*) AS total FROM learning_materials';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching total materials:', err);
      return res.status(500).json({ message: 'Failed to get total materials' });
    }
    res.json({ total: result[0].total });
  });
});

// Route to get the number of learned materials by the user
app.get('/api/learned-materials', isAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  const sql = 'SELECT COUNT(*) AS learned FROM user_material_views WHERE user_id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching learned materials:', err);
      return res.status(500).json({ message: 'Failed to get learned materials' });
    }
    res.json({ learned: result[0].learned });
  });
});



//クイズページ関連ーーーーーーーーーーーーーーーーーーーーーーーーーーーー
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

app.get('/quiz-stats', isAuthenticated, (req, res) => {
  const userId = req.session.user.id;

  // Get the total number of questions
  db.query('SELECT COUNT(*) as total FROM quizzes', (err, totalQuestions) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching total questions' });
    }

    // Get the number of answers and correct answers for the logged-in user
    db.query(`
      SELECT 
      COALESCE(COUNT(*), 0) as totalAnswers,
      COALESCE(SUM(is_correct), 0) as correctAnswers
      FROM user_answers
      WHERE user_id = ?
    `, [userId], (err, userStats) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching user stats' });
      }

      // Calculate accuracy rate
      const accuracyRate = (userStats[0].correctAnswers / totalQuestions[0].total) * 100;

      res.status(200).json({
        totalQuestions: totalQuestions[0].total,
        totalAnswers: userStats[0].totalAnswers,
        correctAnswers: userStats[0].correctAnswers,
        accuracyRate: accuracyRate.toFixed(0)
      });
    });
  });
});


//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//------AI処理

const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const upload = multer({ dest: 'uploads/' });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const fs = require('fs').promises;

app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '画像ファイルが必要です。' });
    }

    // 画像ファイルのデータを取得し、Base64にエンコード
    const fileBuffer = await fs.readFile(req.file.path);
    const base64Image = fileBuffer.toString('base64');

    const prompt = "写真の場所で災害が起きたらどんな危険性が考えられますか？２００文字程度でまとめてください。";

    // AIモデルへのリクエストに必要なデータを準備
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: req.file.mimetype,
        },
      },
    ]);

    // 解析結果を取得
    const analyzeResult = await result.response.text();

    res.json({ analyzeResult });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '内部サーバーエラーが発生しました' });
  }
});

// app.post('/api/analyze', upload.single('image'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: '画像ファイルが必要です。' });
//         }

//         const imageFile = await fileToGenerativePart(req.file);
//         //プロンプト
//         const prompt = `
//             「地震が発生した場合、標識が倒れる危険性があります。また、建物の窓ガラスが割れて落下する可能性も高いので、十分に注意してください。」と言ってください
//         `;

//         // AI モデルに prompt を送信して結果を取得
//         const result = await model.generateContent(prompt);

//         // 結果をテキストとして取得
//         const analyzeResult = await result.response.text();

//         res.json({ analyzeResult });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: '内部サーバーエラーが発生しました' });
//     }
// });



// async function fileToGenerativePart(file) {
//   const data = await fs.readFile(file.path); // アップロードされたファイルを読み込む
//   const base64EncodedData = data.toString('base64'); // Base64 エンコード
//   return {
//     inlineData: { data: base64EncodedData, mimeType: file.mimetype },
//   };
// }




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});