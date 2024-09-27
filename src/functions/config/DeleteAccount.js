import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `アカウント削除`;
  });

  const handleAccountDelete = () => {
    axios.post('http://localhost:3001/api/delete-account', { currentPassword })
      .then(response => {
        alert('アカウントを削除しました。トップページに戻ります。');
        // Redirect to the login page after deletion
        navigate('/');
      })
      .catch(error => {
        setMessage('アカウントの削除に失敗しました。' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '0 23rem' }} className='japanese-text'>
      <Typography variant="h5" gutterBottom>
        アカウントの<ruby>削除<rt>さくじょ</rt></ruby>
      </Typography>
      <Typography variant="body1" gutterBottom>
        アカウントの<ruby>削除<rt>さくじょ</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>います。パスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください。
      </Typography>
      <TextField
        label="パスワード"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleAccountDelete}
        className='japanese-text'
      >
        アカウント<ruby>削除<rt>さくじょ</rt></ruby>
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default DeleteAccount;
