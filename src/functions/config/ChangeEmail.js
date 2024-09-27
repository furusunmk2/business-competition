//aaa

import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangeEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = `メールアドレス変更`;
  });

  const handleEmailChange = () => {
    axios.post('http://localhost:3001/api/change-email', { email })
      .then(response => {
        setMessage('メールアドレスの更新に成功しました。');
      })
      .catch(error => {
        setMessage('メールアドレスの更新に失敗しました。');
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '0 23rem' }} className='japanese-text'>
      <Typography variant="h5" gutterBottom>
        メールアドレスの<ruby>変更<rt>へんこう</rt></ruby>
      </Typography>
      <Typography variant="body1" gutterBottom>
        メールアドレスの<ruby>変更<rt>へんこう</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>います。<ruby>新<rt>あたら</rt></ruby>しいメールアドレスを<ruby>入力<rt>にゅうりょく</rt></ruby>してください。
      </Typography>
      <TextField
        label="新しいメールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleEmailChange}
        className='japanese-text'
      >
        <ruby>変更<rt>へんこう</rt></ruby>する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>

  );
};

export default ChangeEmail;
