// Login.js


import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true; // すべてのリクエストでクレデンシャルを含む


function Login({ setLoggedIn }) {
  const [loginInput, setLoginInput] = useState(''); // Combine username and email
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLocalLogin = async () => {
    console.log('Login attempt:', { loginInput, password }); // ログを追加
    try {
      const response = await axios.post('http://localhost:3001/login', { loginInput, password }, { withCredentials: true });
      if (response.data && response.status === 200) {
        setLoggedIn(true);
        navigate('/app/home');
      } else {
        setMessage('ログイン失敗');
      }
    } catch (error) {
      setMessage('ログイン失敗: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Container>
      <Typography component="h1" variant="h5" className="dq-title" style={{ color: 'gray' }}>
          冒険を続ける
      </Typography>
      <TextField
        label="ユーザーネーム or メールアドレス"
        variant="outlined"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        style={{ margin: '10px 0' }}
        fullWidth
        InputProps={{
          style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
        }}
      />
      <TextField
        label="パスワード"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '10px 0' }}
        fullWidth
        InputProps={{
          style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLocalLogin} // 関数名を変更
        style={{ marginTop: '10px',color:"white" }}
        InputProps={{
          style: { backgroundColor: 'white'}, // 入力フィールドの背景を白くする
        }}
      >
        ログイン
      </Button>
      {message && <Typography style={{ marginTop: '10px', textAlign: 'center' }}>{message}</Typography>}
    </Container>
  );
}

export default Login;
