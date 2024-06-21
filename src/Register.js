// Register.js

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import './Register.css'; // スタイルシートをインポート

const Register = ({ setUsername: setGlobalUsername, setPassword: setGlobalPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      console.log(response.data); // レスポンスデータをログに出力
      if (response.status === 200) {
        alert('Registration successful');
        setGlobalUsername(username);
        setGlobalPassword(password);
      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error); // エラーデータをログに出力
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed: Network or server error');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="dq-container">
      <Typography component="h1" variant="h5" className="dq-title">
        新規登録
      </Typography>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="ユーザー名"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="dq-button"
          onClick={handleRegister}
        >
          登録
        </Button>
      </form>
    </Container>
  );
};

export default Register;
