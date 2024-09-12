import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAccountDelete = () => {
    axios.post('http://localhost:3001/api/delete-account', { currentPassword })
      .then(response => {
        alert('Account deleted successfully!');
        // Redirect to the login page after deletion
        navigate('/');
      })
      .catch(error => {
        setMessage('アカウントの削除に失敗しました。' + error.response.data);
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        アカウントの削除
      </Typography>
      <Typography variant="body1" gutterBottom>
        アカウントの削除を行います。パスワードを入力してください。
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
      >
        アカウント削除
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

export default DeleteAccount;
