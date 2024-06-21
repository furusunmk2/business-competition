// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Link, Container } from '@mui/material';
import './Login.css'; // スタイルシートをインポート

function Login({ handleLogin, setUsername, setPassword }) {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" className="dq-container">
      <Typography component="h1" variant="h5" className="dq-title">
        ログイン
      </Typography>
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
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="dq-button"
        onClick={handleLogin}
      >
        ログイン
      </Button>
    </Container>
  );
}

export default Login;
