// Login.js



import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLocalLogin = async () => {
    console.log('Login attempt:', { username, password }); // ログを追加
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.data && response.status === 200) {
        setLoggedIn(true);
        navigate('/app');
      } else {
        setMessage('ログイン失敗');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setMessage('ログイン失敗: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Container>
      <Typography variant="h6" style={{ marginTop: '2em', textAlign: 'center' }}>
        ログイン
      </Typography>
      <TextField
        label="ユーザー名"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: '10px 0' }}
        fullWidth
      />
      <TextField
        label="パスワード"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px 0' }}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLocalLogin} // 関数名を変更
        style={{ marginTop: '10px' }}
      >
        ログイン
      </Button>
      {message && <Typography style={{ marginTop: '10px', textAlign: 'center' }}>{message}</Typography>}
    </Container>
  );
}

export default Login;
