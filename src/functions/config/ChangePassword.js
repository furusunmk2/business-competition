import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = `パスワード変更`;
  });

  const handlePasswordChange = () => {
    axios.post('http://localhost:3001/api/change-password', { currentPassword, newPassword })
      .then(response => {
        setMessage('パスワードの更新に成功しました。');
      })
      .catch(error => {
        setMessage('パスワードの更新に失敗しました。' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '0 23rem' }} className='japanese-text'>
      <Typography variant="h5" gutterBottom>
        パスワードの<ruby>変更<rt>へんこう</rt></ruby>
      </Typography>
      <Typography variant="body1" gutterBottom>
        パスワードの<ruby>変更<rt>へんこう</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>います。<ruby>現在<rt>げんざい</rt></ruby>のパスワードと<ruby>新<rt>あたら</rt></ruby>しいパスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください。
      </Typography>
      <TextField
        label="現在のパスワード"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="新しいパスワード"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handlePasswordChange}
        className='japanese-text'
      >
        <ruby>変更<rt>へんこう</rt></ruby>する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default ChangePassword;
