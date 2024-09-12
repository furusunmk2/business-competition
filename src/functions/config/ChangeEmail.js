import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangeEmail = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = () => {
    axios.post('http://localhost:3001/api/change-email', { email })
      .then(response => {
        setMessage('Email updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating email');
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        メールアドレスの変更
      </Typography>
      <Typography variant="body1" gutterBottom>
        メールアドレスの変更を行います。新しいメールアドレスを入力してください。
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
      >
        変更する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>

  );
};

export default ChangeEmail;
