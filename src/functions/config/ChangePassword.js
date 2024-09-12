import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = () => {
    axios.post('http://localhost:3001/api/change-password', { currentPassword, newPassword })
      .then(response => {
        setMessage('Password updated successfully!');
      })
      .catch(error => {
        setMessage('Error updating password: ' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        パスワードの変更
      </Typography>
      <Typography variant="body1" gutterBottom>
        パスワードの変更を行います。現在のパスワードと新しいパスワードを入力してください。
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
      >
        変更する
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default ChangePassword;
