// Register.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import './App.css'

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', { username, email, password, nickname});
      console.log(response.data);
      if (response.status === 200) {
        alert('アカウント登録に成功しました。');
        

      } else {
        alert(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed: Network or server error');
      }
    }
  };

  return (
    <div className='japanese-text'>
      <Typography component="h1" variant="h5" className="dq-title" style={{ color: 'gray' }}>
        <ruby>
          冒険者<rt>ぼうけんしゃ</rt>になる
        </ruby>
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="ユーザーネーム"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
          className="dq-input"
          
          InputLabelProps={{ className: 'dq-input-label' }}
          InputProps={{
            style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
          }}
        />
        <TextField
          label="パスワード"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
          InputProps={{
            style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
          }}
        />
        <TextField
          label="メールアドレス"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
          InputProps={{
            style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
          }}
        />

        <TextField
          label="ニックネーム"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="nickname"
          type="nickname"
          id="nickname"
          autoComplete="current-password"
          onChange={(e) => setNickname(e.target.value)}
          className="dq-input"
          InputLabelProps={{ className: 'dq-input-label' }}
          InputProps={{
            style: { backgroundColor: 'white' }, // 入力フィールドの背景を白くする
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' ,color:"white" }}
          className='japanese-text'
        >
        <ruby>登録<rt>とうろく</rt>する</ruby>
        </Button>
      </form>
    </div>
  );
};

export default Register;

