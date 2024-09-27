import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangeNickname = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = `ニックネーム変更`;
  });

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
    <Box sx={{ padding: '0 23rem' }} className='japanese-text'>
      <Typography variant="h5" gutterBottom>
        ニックネームの<ruby>変更<rt>へんこう</rt></ruby>
      </Typography>
      <Typography variant="body1" gutterBottom>
        ニックネームの<ruby>変更<rt>へんこう</rt></ruby>を<ruby>行<rt>おこな</rt></ruby>います。<ruby>新<rt>あたら</rt></ruby>しいニックネームを<ruby>入力<rt>にゅうりょく</rt></ruby>してください。
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
        className='japanese-text'
      >
        <ruby>変更<rt>へんこう</rt></ruby>する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default ChangeNickname;
