import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangeNickname = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  const handleNicknameChange = () => {
    axios.post('http://localhost:3001/api/change-nickname', { nickname })
      .then(response => {
        setMessage('ニックネームの更新に成功しました。');
      })
      .catch(error => {
        setMessage('ニックネームの更新に失敗しました。');
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        ニックネームの変更
      </Typography>
      <Typography variant="body1" gutterBottom>
        ニックネームの変更を行います。新しいニックネームを入力してください。
      </Typography>
      <TextField
        label="新しいニックネーム"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNicknameChange}
      >
        更新する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default ChangeNickname;
